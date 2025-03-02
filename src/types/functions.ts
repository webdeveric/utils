/**
 * Predicate function for use with Array methods,
 * such as `filter()`, `find()`, or `some()`.
 */
export type ArrayPredicateFn<A, T extends A = A> =
  | ((value: T, index: number, array: readonly A[]) => value is T)
  | ((value: T, index: number, array: readonly A[]) => unknown);

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#comparefn
 */
export type CompareFn<T> = (a: T, b: T) => number;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypePredicateFn<T> = (input: unknown, ...args: any[]) => input is T;

export type InferPredicateReturnType<Fn> = Fn extends TypePredicateFn<infer T> ? T : never;

export type InferPredicatesReturnType<Predicates extends TypePredicateFn<unknown>[]> = {
  [K in keyof Predicates]: InferPredicateReturnType<Predicates[K]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypeAssertionFn<T> = (input: unknown, ...args: any[]) => asserts input is T;

export type InferAssertionReturnType<Fn> = Fn extends TypeAssertionFn<infer T> ? T : never;

export type InferAssertionsReturnType<Fns extends TypeAssertionFn<unknown>[]> = {
  [K in keyof Fns]: InferAssertionReturnType<Fns[K]>;
}[number];
