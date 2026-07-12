import type { TypePredicateFn } from '../../types/functions.js';

/**
 * Create a type predicate function that checks `input` against `predicate`, applying it to every item when `input` is an array.
 *
 * @example
 * ```ts
 * const isStringOrStringArray = maybeArray(isString);
 * isStringOrStringArray('hello'); // true
 * isStringOrStringArray(['a', 'b']); // true
 * isStringOrStringArray(['a', 1]); // false
 * ```
 */
export const maybeArray =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T | T[]> =>
  (input: unknown): input is T | T[] =>
    Array.isArray(input) ? input.every(predicate) : predicate(input);
