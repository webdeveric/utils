import type { Nullish } from '../../types/common.js';
import type { TypePredicateFn } from '../../types/functions.js';

/**
 * Create a type predicate function that passes if `input` is `null`, `undefined`, or passes the given `predicate`.
 *
 * @example
 * ```ts
 * const isNullishString = nullish(isString);
 * isNullishString('hello'); // true
 * isNullishString(null); // true
 * isNullishString(undefined); // true
 * isNullishString(5); // false
 * ```
 */
export const nullish =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<Nullish<T>> =>
  (input: unknown): input is Nullish<T> =>
    input == null || predicate(input);
