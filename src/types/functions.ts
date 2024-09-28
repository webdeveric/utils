export type Predicate<A, T extends A = A> =
  | ((value: T, index: number, array: readonly A[]) => value is T)
  | ((value: T, index: number, array: readonly A[]) => unknown);

export type TypePredicateFn<T> = (input: unknown) => input is T;

export type TypeAssertionFn<T> = (input: unknown) => asserts input is T;

export type CompareFn<T> = (a: T, b: T) => number;

export type InferPredicatesReturnType<Predicates extends TypePredicateFn<unknown>[]> = {
  [K in keyof Predicates]: Predicates[K] extends TypePredicateFn<infer T> ? T : never;
}[number];
