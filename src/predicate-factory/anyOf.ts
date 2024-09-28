import type { InferPredicatesReturnType, TypePredicateFn } from '../types/functions.js';

/**
 * Any predicate can pass
 */
export const anyOf = <Predicates extends TypePredicateFn<unknown>[]>(
  ...predicates: Predicates
): TypePredicateFn<InferPredicatesReturnType<Predicates>> => {
  if (!predicates.length) {
    throw new Error('Predicate functions not provided');
  }

  return (input: unknown): input is InferPredicatesReturnType<Predicates> => {
    for (const predicate of predicates) {
      if (predicate(input)) {
        return true;
      }
    }

    return false;
  };
};
