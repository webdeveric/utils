import type { InferPredicatesReturnType, TypePredicateFn } from '../../types/functions.js';
import type { UnionOf } from '../../types/utils.js';

/**
 * Any predicate can pass
 */
export const anyOf = <Predicates extends TypePredicateFn<unknown>[]>(
  ...predicates: Predicates
): TypePredicateFn<UnionOf<InferPredicatesReturnType<Predicates>>> => {
  if (!predicates.length) {
    throw new Error('Predicate functions not provided');
  }

  return (input: unknown): input is UnionOf<InferPredicatesReturnType<Predicates>> =>
    predicates.some((predicate) => predicate(input));
};
