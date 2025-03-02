import type { InferPredicatesReturnType, TypePredicateFn } from '../types/functions.js';
import type { IntersectionOf } from '../types/utils.js';

/**
 * All predicates must pass
 */
export const allOf = <Predicates extends TypePredicateFn<unknown>[]>(
  ...predicates: Predicates
): TypePredicateFn<IntersectionOf<InferPredicatesReturnType<Predicates>>> => {
  if (!predicates.length) {
    throw new Error('Predicate functions not provided');
  }

  return (input: unknown): input is IntersectionOf<InferPredicatesReturnType<Predicates>> =>
    predicates.every((predicate) => predicate(input));
};
