import type { TypePredicateFn } from '../../types/functions.js';

/**
 * Create a type predicate function that passes if `input` is `undefined` or passes the given `predicate`.
 *
 * @example
 * ```ts
 * const isOptionalString = optional(isString);
 * isOptionalString('hello'); // true
 * isOptionalString(undefined); // true
 * isOptionalString(null); // false
 * ```
 */
export const optional =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T | undefined> =>
  (input: unknown): input is T | undefined =>
    typeof input === 'undefined' || predicate(input);
