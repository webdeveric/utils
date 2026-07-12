import type { NonEmptyArray } from '../../types/arrays.js';
import type { InferPredicatesReturnType, TypePredicateFn } from '../../types/functions.js';
import type { IntersectionOf } from '../../types/utils.js';

/**
 * All predicates must pass
 *
 * @example
 * ```ts
 * const isPositiveInteger = allOf(isNumber, isInteger, (input: unknown): input is number => (input as number) > 0);
 * isPositiveInteger(5); // true
 * isPositiveInteger(-5); // false
 * isPositiveInteger(1.5); // false
 * ```
 */
export const allOf = <Predicates extends NonEmptyArray<TypePredicateFn<unknown>>>(
  ...predicates: Predicates
): TypePredicateFn<IntersectionOf<InferPredicatesReturnType<Predicates>>> => {
  if (!predicates.length) {
    throw new Error('Predicate functions not provided');
  }

  return (input: unknown): input is IntersectionOf<InferPredicatesReturnType<Predicates>> =>
    predicates.every((predicate) => predicate(input));
};
