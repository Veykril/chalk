use super::*;

mod fulfill;
mod search_graph;
mod stack;

use self::fulfill::Fulfill;
use self::search_graph::{DepthFirstNumber, SearchGraph};
use self::stack::{Stack, StackDepth};
use chalk_engine::fallible::{Fallible, NoSolution};
use chalk_ir::could_match::CouldMatch;
use clauses::program_clauses_for_goal;

type UCanonicalGoal<I> = UCanonical<InEnvironment<Goal<I>>>;

pub(crate) struct RecursiveContext<I: Interner> {
    stack: Stack,
    search_graph: SearchGraph<I>,

    caching_enabled: bool,
}

/// A Solver is the basic context in which you can propose goals for a given
/// program. **All questions posed to the solver are in canonical, closed form,
/// so that each question is answered with effectively a "clean slate"**. This
/// allows for better caching, and simplifies management of the inference
/// context.
pub(crate) struct Solver<'me, I: Interner> {
    program: &'me dyn RustIrDatabase<I>,
    context: &'me mut RecursiveContext<I>,
}

/// The `minimums` struct is used while solving to track whether we encountered
/// any cycles in the process.
#[derive(Copy, Clone, Debug)]
struct Minimums {
    positive: DepthFirstNumber,
}

/// An extension trait for merging `Result`s
trait MergeWith<T> {
    fn merge_with<F>(self, other: Self, f: F) -> Self
    where
        F: FnOnce(T, T) -> T;
}

impl<T> MergeWith<T> for Fallible<T> {
    fn merge_with<F>(self: Fallible<T>, other: Fallible<T>, f: F) -> Fallible<T>
    where
        F: FnOnce(T, T) -> T,
    {
        match (self, other) {
            (Err(_), Ok(v)) | (Ok(v), Err(_)) => Ok(v),
            (Ok(v1), Ok(v2)) => Ok(f(v1, v2)),
            (Err(_), Err(e)) => Err(e),
        }
    }
}

impl<I: Interner> RecursiveContext<I> {
    pub(crate) fn new(overflow_depth: usize, caching_enabled: bool) -> Self {
        RecursiveContext {
            stack: Stack::new(overflow_depth),
            search_graph: SearchGraph::new(),
            caching_enabled,
        }
    }

    pub(crate) fn solver<'me>(
        &'me mut self,
        program: &'me dyn RustIrDatabase<I>,
    ) -> Solver<'me, I> {
        Solver {
            program,
            context: self,
        }
    }
}

impl<'me, I: Interner> Solver<'me, I> {
    /// Solves a canonical goal. The substitution returned in the
    /// solution will be for the fully decomposed goal. For example, given the
    /// program
    ///
    /// ```ignore
    /// struct u8 { }
    /// struct SomeType<T> { }
    /// trait Foo<T> { }
    /// impl<U> Foo<u8> for SomeType<U> { }
    /// ```
    ///
    /// and the goal `exists<V> { forall<U> { SomeType<U>: Foo<V> }
    /// }`, `into_peeled_goal` can be used to create a canonical goal
    /// `SomeType<!1>: Foo<?0>`. This function will then return a
    /// solution with the substitution `?0 := u8`.
    pub(crate) fn solve_root_goal(
        &mut self,
        canonical_goal: &UCanonicalGoal<I>,
    ) -> Fallible<Solution<I>> {
        debug!("solve_root_goal(canonical_goal={:?})", canonical_goal);
        assert!(self.context.stack.is_empty());
        let minimums = &mut Minimums::new();
        self.solve_goal(canonical_goal.clone(), minimums)
    }

    /// Attempt to solve a goal that has been fully broken down into leaf form
    /// and canonicalized. This is where the action really happens, and is the
    /// place where we would perform caching in rustc (and may eventually do in Chalk).
    fn solve_goal(
        &mut self,
        goal: UCanonicalGoal<I>,
        minimums: &mut Minimums,
    ) -> Fallible<Solution<I>> {
        info_heading!("solve_goal({:?})", goal);

        // First check the cache.
        // TODO
        // if let Some(value) = self.cache.get(&goal) {
        //     debug!("solve_reduced_goal: cache hit, value={:?}", value);
        //     return value.clone();
        // }

        // Next, check if the goal is in the search tree already.
        if let Some(dfn) = self.context.search_graph.lookup(&goal) {
            // Check if this table is still on the stack.
            if let Some(depth) = self.context.search_graph[dfn].stack_depth {
                // Is this a coinductive goal? If so, that is success,
                // so we can return normally. Note that this return is
                // not tabled.
                //
                // XXX how does caching with coinduction work?
                if self.context.stack.coinductive_cycle_from(depth) {
                    let value = ConstrainedSubst {
                        subst: goal.trivial_substitution(self.program.interner()),
                        constraints: vec![],
                    };
                    debug!("applying coinductive semantics");
                    return Ok(Solution::Unique(Canonical {
                        value,
                        binders: goal.canonical.binders,
                    }));
                }

                self.context.stack[depth].flag_cycle();
            }

            minimums.update_from(self.context.search_graph[dfn].links);

            // Return the solution from the table.
            let previous_solution = self.context.search_graph[dfn].solution.clone();
            debug!(
                "solve_goal: cycle detected, previous solution {:?}",
                previous_solution
            );
            previous_solution
        } else {
            // Otherwise, push the goal onto the stack and create a table.
            // The initial result for this table is error.
            let depth = self.context.stack.push(self.program, &goal);
            let dfn = self.context.search_graph.insert(&goal, depth);
            let subgoal_minimums = self.solve_new_subgoal(goal, depth, dfn);
            self.context.search_graph[dfn].links = subgoal_minimums;
            self.context.search_graph[dfn].stack_depth = None;
            self.context.stack.pop(depth);
            minimums.update_from(subgoal_minimums);

            // Read final result from table.
            let result = self.context.search_graph[dfn].solution.clone();

            // If processing this subgoal did not involve anything
            // outside of its subtree, then we can promote it to the
            // cache now. This is a sort of hack to alleviate the
            // worst of the repeated work that we do during tabling.
            if subgoal_minimums.positive >= dfn {
                if self.context.caching_enabled {
                    // TODO
                    // self.search_graph.move_to_cache(dfn, &mut self.cache);
                    debug!("solve_reduced_goal: SCC head encountered, moving to cache");
                } else {
                    debug!(
                        "solve_reduced_goal: SCC head encountered, rolling back as caching disabled"
                    );
                    self.context.search_graph.rollback_to(dfn);
                }
            }

            debug!("solve_goal: solution = {:?}", result,);
            result
        }
    }

    fn solve_new_subgoal(
        &mut self,
        canonical_goal: UCanonicalGoal<I>,
        depth: StackDepth,
        dfn: DepthFirstNumber,
    ) -> Minimums {
        debug_heading!(
            "solve_new_subgoal(canonical_goal={:?}, depth={:?}, dfn={:?})",
            canonical_goal,
            depth,
            dfn,
        );

        // We start with `answer = None` and try to solve the goal. At the end of the iteration,
        // `answer` will be updated with the result of the solving process. If we detect a cycle
        // during the solving process, we cache `answer` and try to solve the goal again. We repeat
        // until we reach a fixed point for `answer`.
        // Considering the partial order:
        // - None < Some(Unique) < Some(Ambiguous)
        // - None < Some(CannotProve)
        // the function which maps the loop iteration to `answer` is a nondecreasing function
        // so this function will eventually be constant and the loop terminates.
        let minimums = &mut Minimums::new();
        loop {
            let UCanonical {
                universes,
                canonical:
                    Canonical {
                        binders,
                        value: InEnvironment { environment, goal },
                    },
            } = canonical_goal.clone();

            let current_answer = match goal.data() {
                GoalData::DomainGoal(domain_goal) => {
                    let canonical_goal = UCanonical {
                        universes,
                        canonical: Canonical {
                            binders,
                            value: InEnvironment {
                                environment,
                                goal: domain_goal.clone(),
                            },
                        },
                    };

                    // "Domain" goals (i.e., leaf goals that are Rust-specific) are
                    // always solved via some form of implication. We can either
                    // apply assumptions from our environment (i.e. where clauses),
                    // or from the lowered program, which includes fallback
                    // clauses. We try each approach in turn:

                    let InEnvironment { environment, goal } = &canonical_goal.canonical.value;
                    let env_solution = {
                        debug_heading!("env_clauses");

                        // TODO use code from clauses module
                        let env_clauses = environment
                            .clauses
                            .iter()
                            .filter(|&clause| clause.could_match(goal))
                            .cloned();
                        self.solve_from_clauses(&canonical_goal, env_clauses, minimums)
                    };
                    debug!("env_solution={:?}", env_solution);

                    let prog_solution = {
                        debug_heading!("prog_clauses");

                        // TODO this also includes clauses from env
                        let prog_clauses =
                            program_clauses_for_goal(self.program, environment, &goal);
                        self.solve_from_clauses(&canonical_goal, prog_clauses, minimums)
                    };
                    debug!("prog_solution={:?}", prog_solution);

                    // Now that we have all the outcomes, we attempt to combine
                    // them. Here, we apply a heuristic (also found in rustc): if we
                    // have possible solutions via both the environment *and* the
                    // program, we favor the environment; this only impacts type
                    // inference. The idea is that the assumptions you've explicitly
                    // made in a given context are more likely to be relevant than
                    // general `impl`s.
                    env_solution.merge_with(prog_solution, |env, prog| env.favor_over(prog))
                }

                _ => {
                    let canonical_goal = UCanonical {
                        universes,
                        canonical: Canonical {
                            binders,
                            value: InEnvironment { environment, goal },
                        },
                    };

                    self.solve_via_simplification(&canonical_goal, minimums)
                }
            };

            debug!(
                "solve_new_subgoal: loop iteration result = {:?} with minimums {:?}",
                current_answer, minimums
            );

            if !self.context.stack[depth].read_and_reset_cycle_flag() {
                // None of our subgoals depended on us directly.
                // We can return.
                self.context.search_graph[dfn].solution = current_answer;
                return *minimums;
            }

            // Some of our subgoals depended on us. We need to re-run
            // with the current answer.
            if self.context.search_graph[dfn].solution == current_answer {
                // Reached a fixed point.
                return *minimums;
            }

            let current_answer_is_ambig = match &current_answer {
                Ok(s) => s.is_ambig(),
                Err(_) => false,
            };

            self.context.search_graph[dfn].solution = current_answer;

            // Subtle: if our current answer is ambiguous, we can just stop, and
            // in fact we *must* -- otherwise, we sometimes fail to reach a
            // fixed point. See `multiple_ambiguous_cycles` for more.
            if current_answer_is_ambig {
                return *minimums;
            }

            // Otherwise: rollback the search tree and try again.
            self.context.search_graph.rollback_to(dfn + 1);
        }
    }

    fn solve_via_simplification(
        &mut self,
        canonical_goal: &UCanonicalGoal<I>,
        minimums: &mut Minimums,
    ) -> Fallible<Solution<I>> {
        debug_heading!("solve_via_simplification({:?})", canonical_goal);
        let (mut fulfill, subst, goal) = Fulfill::new(self, canonical_goal);
        fulfill.push_goal(&goal.environment, goal.goal)?;
        fulfill.solve(subst, minimums)
    }

    /// See whether we can solve a goal by implication on any of the given
    /// clauses. If multiple such solutions are possible, we attempt to combine
    /// them.
    fn solve_from_clauses<C>(
        &mut self,
        canonical_goal: &UCanonical<InEnvironment<DomainGoal<I>>>,
        clauses: C,
        minimums: &mut Minimums,
    ) -> Fallible<Solution<I>>
    where
        C: IntoIterator<Item = ProgramClause<I>>,
    {
        let mut cur_solution = None;
        fn combine_with_priorities<I: Interner>(
            a: Solution<I>,
            prio_a: ClausePriority,
            inputs_a: Vec<Parameter<I>>,
            b: Solution<I>,
            prio_b: ClausePriority,
            inputs_b: Vec<Parameter<I>>,
        ) -> (Solution<I>, ClausePriority, Vec<Parameter<I>>) {
            match (prio_a, prio_b) {
                // TODO compare the *input* parts of the solutions
                (ClausePriority::High, ClausePriority::Low) if inputs_a == inputs_b => {
                    debug!(
                        "preferring solution: {:?} over {:?} because of higher prio",
                        a, b
                    );
                    (a, ClausePriority::High, inputs_a)
                }
                (ClausePriority::Low, ClausePriority::High) if inputs_a == inputs_b => {
                    debug!(
                        "preferring solution: {:?} over {:?} because of higher prio",
                        b, a
                    );
                    (b, ClausePriority::High, inputs_b)
                }
                _ => (a.combine(b), prio_a, inputs_a),
            }
        }
        for program_clause in clauses {
            debug_heading!("clause={:?}", program_clause);

            match program_clause {
                ProgramClause::Implies(implication) => {
                    let priority = implication.priority;
                    let res = self.solve_via_implication(
                        canonical_goal,
                        Binders {
                            binders: vec![],
                            value: implication,
                        },
                        minimums,
                    );
                    if let Ok(solution) = res {
                        debug!("ok: solution={:?} prio={:?}", solution, priority);
                        let inputs = if let Some(subst) = solution.constrained_subst() {
                            let subst_goal = subst.value.subst.apply(
                                &canonical_goal.canonical.value.goal,
                                self.program.interner(),
                            );
                            debug!("subst_goal = {:?}", subst_goal);
                            subst_goal.inputs(self.program.interner())
                        } else {
                            canonical_goal
                                .canonical
                                .value
                                .goal
                                .inputs(self.program.interner())
                        };
                        cur_solution = Some(match cur_solution {
                            None => (solution, priority, inputs),
                            Some((cur, cur_priority, cur_inputs)) => combine_with_priorities(
                                cur,
                                cur_priority,
                                cur_inputs,
                                solution,
                                priority,
                                inputs,
                            ),
                        });
                    } else {
                        debug!("error");
                    }
                }
                ProgramClause::ForAll(implication) => {
                    let priority = implication.value.priority;
                    let res = self.solve_via_implication(canonical_goal, implication, minimums);
                    if let Ok(solution) = res {
                        debug!("ok: solution={:?} prio={:?}", solution, priority);
                        let inputs = if let Some(subst) = solution.constrained_subst() {
                            let subst_goal = subst.value.subst.apply(
                                &canonical_goal.canonical.value.goal,
                                self.program.interner(),
                            );
                            debug!("subst_goal = {:?}", subst_goal);
                            subst_goal.inputs(self.program.interner())
                        } else {
                            canonical_goal
                                .canonical
                                .value
                                .goal
                                .inputs(self.program.interner())
                        };
                        cur_solution = Some(match cur_solution {
                            None => (solution, priority, inputs),
                            Some((cur, cur_priority, cur_inputs)) => combine_with_priorities(
                                cur,
                                cur_priority,
                                cur_inputs,
                                solution,
                                priority,
                                inputs,
                            ),
                        });
                    } else {
                        debug!("error");
                    }
                }
            }
        }
        cur_solution.map(|(s, _, _)| s).ok_or(NoSolution)
    }

    /// Modus ponens! That is: try to apply an implication by proving its premises.
    fn solve_via_implication(
        &mut self,
        canonical_goal: &UCanonical<InEnvironment<DomainGoal<I>>>,
        clause: Binders<ProgramClauseImplication<I>>,
        minimums: &mut Minimums,
    ) -> Fallible<Solution<I>> {
        info_heading!(
            "solve_via_implication(\
             \n    canonical_goal={:?},\
             \n    clause={:?})",
            canonical_goal,
            clause
        );
        let (mut fulfill, subst, goal) = Fulfill::new(self, canonical_goal);
        let ProgramClauseImplication {
            consequence,
            conditions,
            priority: _,
        } = fulfill.instantiate_binders_existentially(&clause);

        debug!("the subst is {:?}", subst);

        fulfill.unify(&goal.environment, &goal.goal, &consequence)?;

        // if so, toss in all of its premises
        for condition in conditions.as_slice() {
            fulfill.push_goal(&goal.environment, condition.clone())?;
        }

        // and then try to solve
        fulfill.solve(subst, minimums)
    }
}

impl Minimums {
    fn new() -> Self {
        Minimums {
            positive: DepthFirstNumber::MAX,
        }
    }

    fn update_from(&mut self, minimums: Minimums) {
        self.positive = ::std::cmp::min(self.positive, minimums.positive);
    }
}
