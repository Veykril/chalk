//! Tests related to projection of associated types and normalization.

use super::*;

#[test]
fn normalize_basic() {
    test! {
        program {
            trait Iterator { type Item; }
            struct Vec<T> { }
            struct u32 { }
            impl<T> Iterator for Vec<T> {
                type Item = T;
            }
        }

        goal {
            forall<T> {
                exists<U> {
                    Normalize(<Vec<T> as Iterator>::Item -> U)
                }
            }
        } yields {
            "Unique; substitution [?0 := !1_0], lifetime constraints []"
        }

        goal {
            forall<T> {
                Vec<T>: Iterator<Item = T>
            }
        } yields {
            "Unique; substitution [], lifetime constraints []"
        }

        goal {
            forall<T> {
                if (T: Iterator<Item = u32>) {
                    <T as Iterator>::Item = u32
                }
            }
        } yields {
            "Unique; substitution []"
        }

        goal {
            forall<T> {
                if (T: Iterator) {
                    exists<U> {
                        T: Iterator<Item = U>
                    }
                }
            }
        } yields {
            "Unique; substitution [?0 := (Iterator::Item)<!1_0>]"
        }

        goal {
            forall<T> {
                if (T: Iterator) {
                    exists<U> {
                        T: Iterator<Item = U>
                    }
                }
            }
        } yields {
            "Unique; substitution [?0 := (Iterator::Item)<!1_0>]"
        }

        goal {
            forall<T> {
                if (T: Iterator) {
                    <T as Iterator>::Item = <T as Iterator>::Item
                }
            }
        } yields {
            "Unique"
        }

        goal {
            forall<T> {
                if (T: Iterator) {
                    exists<U> {
                        <T as Iterator>::Item = <U as Iterator>::Item
                    }
                }
            }
        } yields {
            // True for `U = T`, of course, but also true for `U = Vec<T>`.
            "Ambiguous"
        }
    }
}

#[test]
fn normalize_into_iterator() {
    test! {
        program {
            trait IntoIterator { type Item; }
            trait Iterator { type Item; }
            struct Vec<T> { }
            struct u32 { }
            impl<T> IntoIterator for Vec<T> {
                type Item = T;
            }
            impl<T> IntoIterator for T where T: Iterator {
                type Item = <T as Iterator>::Item;
            }
        }

        goal {
            forall<T> {
                exists<U> {
                    Normalize(<Vec<T> as IntoIterator>::Item -> U)
                }
            }
        } yields {
            "Unique"
        }
    }
}

#[test]
fn projection_equality() {
    test! {
        program {
            trait Trait1 {
                type Type;
            }
            trait Trait2<T> { }
            impl<T, U> Trait2<T> for U where U: Trait1<Type = T> {}

            struct u32 {}
            struct S {}
            impl Trait1 for S {
                type Type = u32;
            }
        }

        goal {
            exists<U> {
                S: Trait2<U>
            }
        } yields {
            // FIXME(rust-lang/chalk#234) -- there is really only one
            // *reasonable* solution here, which is `u32`, but we get
            // confused because `(Trait1::Type)<S>` seems valid too.
            "Ambiguous; no inference guidance"
        }
    }
}

#[test]
fn normalize_gat1() {
    test! {
        program {
            struct Vec<T> { }

            trait Iterable {
                type Iter<'a>;
            }

            impl<T> Iterable for Vec<T> {
                type Iter<'a> = Iter<'a, T>;
            }

            trait Iterator {
                type Item;
            }

            struct Iter<'a, T> { }
            struct Ref<'a, T> { }

            impl<'a, T> Iterator for Iter<'a, T> {
                type Item = Ref<'a, T>;
            }
        }

        goal {
            forall<T> {
                forall<'a> {
                    exists<U> {
                        Normalize(<Vec<T> as Iterable>::Iter<'a> -> U)
                    }
                }
            }
        } yields {
            "Unique; substitution [?0 := Iter<'!2_0, !1_0>], lifetime constraints []"
        }
    }
}

#[test]
fn normalize_gat2() {
    test! {
        program {
            trait StreamingIterator<T> { type Item<'a>; }
            struct Span<'a, T> { }
            struct StreamIterMut<T> { }
            struct u32 { }
            impl<T> StreamingIterator<T> for StreamIterMut<T> {
                type Item<'a> = Span<'a, T>;
            }
        }

        goal {
            forall<'a, T> {
                exists<U> {
                    Normalize(<StreamIterMut<T> as StreamingIterator<T>>::Item<'a> -> U)
                }
            }
        } yields {
            "Unique; substitution [?0 := Span<'!1_0, !1_1>], lifetime constraints []"
        }

        goal {
            forall<'a, T> {
                <StreamIterMut<T> as StreamingIterator<T>>::Item<'a> = Span<'a, T>
            }
        } yields {
            "Unique; substitution [], lifetime constraints []"
        }

        goal {
            forall<'a, T, U> {
                if (T: StreamingIterator<U, Item<'a> = Span<'a, U>>) {
                    <T as StreamingIterator<U>>::Item<'a> = Span<'a, U>
                }
            }
        } yields {
            "Unique; substitution [], lifetime constraints []"
        }
    }
}

#[test]
fn normalize_gat_with_where_clause() {
    test! {
        program {
            trait Sized { }
            trait Foo {
                type Item<T> where T: Sized;
            }

            struct Value<T> { }
            struct Sometype { }
            impl Foo for Sometype {
                type Item<T> = Value<T>;
            }
        }

        goal {
            forall<T> {
                exists<U> {
                    Normalize(<Sometype as Foo>::Item<T> -> U)
                }
            }
        } yields {
            "No possible solution"
        }

        goal {
            forall<T> {
                exists<U> {
                    if (T: Sized) {
                        Normalize(<Sometype as Foo>::Item<T> -> U)
                    }
                }
            }
        } yields {
            "Unique; substitution [?0 := Value<!1_0>]"
        }
    }
}

#[test]
fn normalize_gat_with_where_clause2() {
    test! {
        program {
            trait Bar<T> { }
            trait Foo<T> {
                type Item<U> where U: Bar<T>;
            }

            struct i32 { }
            impl<T> Foo<T> for i32 {
                type Item<U> = U;
            }
        }

        goal {
            forall<T, U> {
                exists<V> {
                    Normalize(<i32 as Foo<T>>::Item<U> -> V)
                }
            }
        } yields {
            "No possible solution"
        }

        goal {
            forall<T, U> {
                exists<V> {
                    if (U: Bar<T>) {
                        Normalize(<i32 as Foo<T>>::Item<U> -> V)
                    }
                }
            }
        } yields {
            "Unique; substitution [?0 := !1_1]"
        }
    }
}

#[test]
fn normalize_gat_with_higher_ranked_trait_bound() {
    test! {
        program {
            trait Foo<'a, T> { }
            struct i32 { }

            trait Bar<'a, T> {
                type Item<V>: Foo<'a, T> where forall<'b> V: Foo<'b, T>;
            }

            impl<'a, T> Foo<'a, T> for i32 { }
            impl<'a, T> Bar<'a, T> for i32 {
                type Item<V> = i32;
            }
        }

        goal {
            forall<'a, T, V> {
                if (forall<'b> { V: Foo<'b, T> }) {
                    exists<U> {
                        Normalize(<i32 as Bar<'a, T>>::Item<V> -> U)
                    }
                }
            }
        } yields {
            "Unique; substitution [?0 := i32], lifetime constraints []"
        }
    }
}

#[test]
fn forall_projection() {
    test! {
        program {
            trait Eq<T> { }
            impl<T> Eq<T> for T { }

            trait DropLt<'a> { type Item; }
            impl<'a, T> DropLt<'a> for T { type Item = T; }

            struct Unit { }
            struct Ref<'a, T> { }
        }

        goal {
            for<'a> <Unit as DropLt<'a>>::Item: Eq<Unit>
        } yields {
            "Unique; substitution [], lifetime constraints []"
        }
    }
}

/// Demonstrates that, given the expected value of the associated
/// type, we can use that to narrow down the relevant impls.
#[test]
fn forall_projection_gat() {
    test! {
        program {
            trait Eq<T> { }
            impl<T> Eq<T> for T { }

            trait Sized { }

            trait DropOuter<'a> { type Item<U> where U: Sized; }
            impl<'a, T> DropOuter<'a> for T { type Item<U> = T; }

            struct Unit { }
            struct Ref<'a, T> { }
        }

        goal {
            forall<T> {
                for<'a> <Unit as DropOuter<'a>>::Item<T>: Eq<Unit>
            }
        } yields {
            "No possible solution"
        }

        goal {
            forall<T> {
                if (T: Sized) {
                    for<'a> <Unit as DropOuter<'a>>::Item<T>: Eq<Unit>
                }
            }
        } yields {
            "Unique; substitution [], lifetime constraints []"
        }

        goal {
            forall<'a, T> {
                WellFormed(<Unit as DropOuter<'a>>::Item<T>)
            }
        } yields {
            "No possible solution"
        }

        goal {
            forall<T> {
                if (T: Sized) {
                    WellFormed(for<'a> <Unit as DropOuter<'a>>::Item<T>: Eq<Unit>)
                }
            }
        } yields {
            "Unique; substitution [], lifetime constraints []"
        }
    }
}
