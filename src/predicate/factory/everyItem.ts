import type { TypePredicateFn } from '../../types/functions.js';

/**
 * Create a type predicate function that checks if `input` is an array whose every item passes the given `predicate`.
 *
 * @example
 * ```ts
 * const isStringArray = everyItem(isString);
 * isStringArray(['a', 'b', 'c']); // true
 * isStringArray(['a', 1, 'c']); // false
 * isStringArray('a'); // false
 * ```
 */
export const everyItem =
  <Type>(predicate: TypePredicateFn<Type>): TypePredicateFn<Type[]> =>
  (input: unknown): input is Type[] =>
    Array.isArray(input) && input.every(predicate);
