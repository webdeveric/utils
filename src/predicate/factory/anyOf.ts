import type { NonEmptyArray } from '../../types/arrays.js';
import type { InferPredicatesReturnType, TypePredicateFn } from '../../types/functions.js';
import type { UnionOf } from '../../types/utils.js';

/**
 * Any predicate can pass
 *
 * @example
 * ```ts
 * const isStringOrNumber = anyOf(isString, isNumber);
 * isStringOrNumber('hello'); // true
 * isStringOrNumber(5); // true
 * isStringOrNumber(true); // false
 * ```
 */
export const anyOf = <Predicates extends NonEmptyArray<TypePredicateFn<unknown>>>(
  ...predicates: Predicates
): TypePredicateFn<UnionOf<InferPredicatesReturnType<Predicates>>> => {
  if (!predicates.length) {
    throw new Error('Predicate functions not provided');
  }

  return (input: unknown): input is UnionOf<InferPredicatesReturnType<Predicates>> =>
    predicates.some((predicate) => predicate(input));
};
