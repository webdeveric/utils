import type { TypePredicateFn } from '../../types/functions.js';

/**
 * Create a type predicate function that passes if `input` is not `null`/`undefined` and passes the given `predicate`.
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype}
 *
 * @example
 * ```ts
 * const isNonNullableString = nonNullable(isString);
 * isNonNullableString('hello'); // true
 * isNonNullableString(null); // false
 * isNonNullableString(undefined); // false
 * ```
 */
export const nonNullable =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<NonNullable<T>> =>
  (input: unknown): input is NonNullable<T> =>
    input != null && predicate(input);
