import type { TypePredicateFn } from '../../types/functions.js';

/**
 * Create a type predicate function that checks if `input` strictly equals the given `value`.
 *
 * @example
 * ```ts
 * const isFoo = literal('foo');
 * isFoo('foo'); // true
 * isFoo('bar'); // false
 * ```
 */
export const literal =
  <const Type>(value: Type): TypePredicateFn<Type> =>
  (input: unknown): input is Type =>
    input === value;
