(function() {var implementors = {};
implementors["chalk_derive"] = [{"text":"impl Clone for DeriveKind","synthetic":false,"types":[]}];
implementors["chalk_engine"] = [{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for SlgContext&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;'me, I:&nbsp;Clone + Interner&gt; Clone for SlgContextOps&lt;'me, I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for StackIndex","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Strand&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for SelectedSubgoal","synthetic":false,"types":[]},{"text":"impl Clone for AnswerIndex","synthetic":false,"types":[]},{"text":"impl Clone for TableIndex","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ExClause&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for TimeStamp","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for FlounderedSubgoal&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Answer&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for CompleteAnswer&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Literal&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for Minimums","synthetic":false,"types":[]},{"text":"impl Clone for AnswerMode","synthetic":false,"types":[]}];
implementors["chalk_integration"] = [{"text":"impl Clone for ChalkError","synthetic":false,"types":[]},{"text":"impl Clone for RawId","synthetic":false,"types":[]},{"text":"impl Clone for ChalkFnAbi","synthetic":false,"types":[]},{"text":"impl Clone for ChalkIr","synthetic":false,"types":[]},{"text":"impl&lt;'k&gt; Clone for Env&lt;'k&gt;","synthetic":false,"types":[]},{"text":"impl Clone for Program","synthetic":false,"types":[]},{"text":"impl Clone for ProgramEnvironment","synthetic":false,"types":[]},{"text":"impl&lt;T&gt; Clone for ArcEq&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl Clone for TypeSort","synthetic":false,"types":[]},{"text":"impl Clone for Unit","synthetic":false,"types":[]},{"text":"impl Clone for TypeKind","synthetic":false,"types":[]},{"text":"impl Clone for SolverChoice","synthetic":false,"types":[]}];
implementors["chalk_ir"] = [{"text":"impl Clone for Void","synthetic":false,"types":[]},{"text":"impl Clone for NoSolution","synthetic":false,"types":[]},{"text":"impl Clone for Variance","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Environment&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;G:&nbsp;Clone + HasInterner&gt; Clone for InEnvironment&lt;G&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;G::Interner: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl Clone for IntTy","synthetic":false,"types":[]},{"text":"impl Clone for UintTy","synthetic":false,"types":[]},{"text":"impl Clone for FloatTy","synthetic":false,"types":[]},{"text":"impl Clone for Scalar","synthetic":false,"types":[]},{"text":"impl Clone for Safety","synthetic":false,"types":[]},{"text":"impl Clone for Mutability","synthetic":false,"types":[]},{"text":"impl Clone for UniverseIndex","synthetic":false,"types":[]},{"text":"impl Clone for UniverseMap","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AdtId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedAdtId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for TraitId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::DefId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ImplId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::DefId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ClauseId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::DefId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AssocTypeId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::DefId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for OpaqueTyId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::DefId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for FnDefId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::DefId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ClosureId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::DefId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for GeneratorId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::DefId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ForeignDefId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::DefId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Ty&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedType: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for TyData&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for TypeFlags","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for TyKind&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for BoundVar","synthetic":false,"types":[]},{"text":"impl Clone for DebruijnIndex","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for DynTy&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for InferenceVar","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for FnSig&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::FnAbi: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for FnSubst&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for FnPointer&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Const&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedConst: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ConstData&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ConstValue&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ConcreteConst&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedConcreteConst: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Lifetime&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedLifetime: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for LifetimeData&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for PlaceholderIndex","synthetic":false,"types":[]},{"text":"impl Clone for TyVariableKind","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for VariableKind&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for GenericArg&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedGenericArg: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for GenericArgData&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner, T:&nbsp;Clone&gt; Clone for WithKind&lt;I, T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AliasTy&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ProjectionTy&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for OpaqueTy&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for TraitRef&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for LifetimeOutlives&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for TypeOutlives&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for WhereClause&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for WellFormed&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for FromEnv&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for DomainGoal&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for EqGoal&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for SubtypeGoal&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Normalize&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AliasEq&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Clone + HasInterner&gt; Clone for Binders&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T::Interner: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ProgramClauseImplication&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for ClausePriority","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ProgramClauseData&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ProgramClause&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedProgramClause: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Clone + HasInterner&gt; Clone for Canonical&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T::Interner: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;T:&nbsp;Clone + HasInterner&gt; Clone for UCanonical&lt;T&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Goal&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedGoal: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for GoalData&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for QuantifierKind","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Constraint&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for QuantifiedWhereClauses&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedQuantifiedWhereClauses: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ProgramClauses&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedProgramClauses: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for VariableKinds&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedVariableKinds: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for CanonicalVarKinds&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedCanonicalVarKinds: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Goals&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedGoals: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Constraints&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedConstraints: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Substitution&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedSubstitution: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Variances&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedVariances: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ConstrainedSubst&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AnswerSubst&lt;I&gt;","synthetic":false,"types":[]}];
implementors["chalk_parse"] = [{"text":"impl Clone for Span","synthetic":false,"types":[]},{"text":"impl Clone for Program","synthetic":false,"types":[]},{"text":"impl Clone for Item","synthetic":false,"types":[]},{"text":"impl Clone for ForeignDefn","synthetic":false,"types":[]},{"text":"impl Clone for AdtDefn","synthetic":false,"types":[]},{"text":"impl Clone for Variant","synthetic":false,"types":[]},{"text":"impl Clone for Movability","synthetic":false,"types":[]},{"text":"impl Clone for GeneratorDefn","synthetic":false,"types":[]},{"text":"impl Clone for AdtFlags","synthetic":false,"types":[]},{"text":"impl Clone for AdtKind","synthetic":false,"types":[]},{"text":"impl Clone for AdtReprAttr","synthetic":false,"types":[]},{"text":"impl Clone for AdtRepr","synthetic":false,"types":[]},{"text":"impl Clone for FnSig","synthetic":false,"types":[]},{"text":"impl Clone for FnDefn","synthetic":false,"types":[]},{"text":"impl Clone for ClosureDefn","synthetic":false,"types":[]},{"text":"impl Clone for FnAbi","synthetic":false,"types":[]},{"text":"impl Clone for TraitDefn","synthetic":false,"types":[]},{"text":"impl Clone for WellKnownTrait","synthetic":false,"types":[]},{"text":"impl Clone for TraitFlags","synthetic":false,"types":[]},{"text":"impl Clone for AssocTyDefn","synthetic":false,"types":[]},{"text":"impl Clone for OpaqueTyDefn","synthetic":false,"types":[]},{"text":"impl Clone for VariableKind","synthetic":false,"types":[]},{"text":"impl Clone for GenericArg","synthetic":false,"types":[]},{"text":"impl Clone for Const","synthetic":false,"types":[]},{"text":"impl Clone for InlineBound","synthetic":false,"types":[]},{"text":"impl Clone for QuantifiedInlineBound","synthetic":false,"types":[]},{"text":"impl Clone for TraitBound","synthetic":false,"types":[]},{"text":"impl Clone for AliasEqBound","synthetic":false,"types":[]},{"text":"impl Clone for Kind","synthetic":false,"types":[]},{"text":"impl Clone for Impl","synthetic":false,"types":[]},{"text":"impl Clone for ImplType","synthetic":false,"types":[]},{"text":"impl Clone for AssocTyValue","synthetic":false,"types":[]},{"text":"impl Clone for Ty","synthetic":false,"types":[]},{"text":"impl Clone for IntTy","synthetic":false,"types":[]},{"text":"impl Clone for UintTy","synthetic":false,"types":[]},{"text":"impl Clone for FloatTy","synthetic":false,"types":[]},{"text":"impl Clone for ScalarType","synthetic":false,"types":[]},{"text":"impl Clone for Mutability","synthetic":false,"types":[]},{"text":"impl Clone for Safety","synthetic":false,"types":[]},{"text":"impl Clone for Lifetime","synthetic":false,"types":[]},{"text":"impl Clone for ProjectionTy","synthetic":false,"types":[]},{"text":"impl Clone for TraitRef","synthetic":false,"types":[]},{"text":"impl Clone for Polarity","synthetic":false,"types":[]},{"text":"impl Clone for Identifier","synthetic":false,"types":[]},{"text":"impl Clone for WhereClause","synthetic":false,"types":[]},{"text":"impl Clone for DomainGoal","synthetic":false,"types":[]},{"text":"impl Clone for LeafGoal","synthetic":false,"types":[]},{"text":"impl Clone for QuantifiedWhereClause","synthetic":false,"types":[]},{"text":"impl Clone for Field","synthetic":false,"types":[]},{"text":"impl Clone for Clause","synthetic":false,"types":[]},{"text":"impl Clone for Goal","synthetic":false,"types":[]},{"text":"impl Clone for ClosureKind","synthetic":false,"types":[]},{"text":"impl Clone for FnArg","synthetic":false,"types":[]},{"text":"impl Clone for FnArgs","synthetic":false,"types":[]},{"text":"impl Clone for Variance","synthetic":false,"types":[]}];
implementors["chalk_recursive"] = [{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Obligation&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for PositiveSolution&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for NegativeSolution","synthetic":false,"types":[]},{"text":"impl Clone for DepthFirstNumber","synthetic":false,"types":[]},{"text":"impl Clone for StackDepth","synthetic":false,"types":[]},{"text":"impl Clone for Minimums","synthetic":false,"types":[]}];
implementors["chalk_solve"] = [{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for SpecializationPriorities&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for SpecializationPriority","synthetic":false,"types":[]},{"text":"impl Clone for InvertedBoundVar","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for UnifiedId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::InternedAdtId: Clone,<br>&nbsp;&nbsp;&nbsp;&nbsp;I::DefId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I, DB:&nbsp;?Sized, P&gt; Clone for WriterState&lt;I, DB, P&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;DB: RustIrDatabase&lt;I&gt;,<br>&nbsp;&nbsp;&nbsp;&nbsp;P: Borrow&lt;DB&gt; + Clone,<br>&nbsp;&nbsp;&nbsp;&nbsp;I: Interner,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;'a, I:&nbsp;Clone + Interner&gt; Clone for InternalWriterState&lt;'a, I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for EnaVariable&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for InferenceValue&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for InferenceTable&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for RecordedItemId&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AssociatedTyValueId&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::DefId: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ImplDatum&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for ImplDatumBound&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for ImplType","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for DefaultImplDatum&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for DefaultImplDatumBound&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AdtDatum&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for AdtKind","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AdtDatumBound&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AdtVariantDatum&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for AdtFlags","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AdtRepr&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for FnDefDatum&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for FnDefInputsAndOutputDatum&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for FnDefDatumBound&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for TraitDatum&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for WellKnownTrait","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for TraitDatumBound&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for TraitFlags","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for InlineBound&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for TraitBound&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AliasEqBound&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AssociatedTyDatum&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I::Identifier: Clone,&nbsp;</span>","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AssociatedTyDatumBound&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AssociatedTyValue&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for AssociatedTyValueBound&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for OpaqueTyDatum&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for OpaqueTyDatumBound&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for Movability","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for GeneratorDatum&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for GeneratorInputOutputDatum&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for GeneratorWitnessDatum&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for GeneratorWitnessExistential&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl Clone for Polarity","synthetic":false,"types":[]},{"text":"impl Clone for ClosureKind","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Solution&lt;I&gt;","synthetic":false,"types":[]},{"text":"impl&lt;I:&nbsp;Clone + Interner&gt; Clone for Guidance&lt;I&gt;","synthetic":false,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()