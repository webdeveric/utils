import type { TypePredicateFn } from '../../types/functions.js';

/**
 * Create a type predicate function that passes if `input` is `null` or passes the given `predicate`.
 *
 * @example
 * ```ts
 * const isNullableString = nullable(isString);
 * isNullableString('hello'); // true
 * isNullableString(null); // true
 * isNullableString(undefined); // false
 * ```
 */
export const nullable =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T | null> =>
  (input: unknown): input is T | null =>
    input === null || predicate(input);
