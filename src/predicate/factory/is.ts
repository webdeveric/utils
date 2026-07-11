import type { NonEmptyArray } from '../../types/arrays.js';
import type { TypePredicateFn } from '../../types/functions.js';
import type { UnionOf } from '../../types/utils.js';

/**
 * Use `Object.is()` to compare `input` against allowed values.
 */
export const is = <const Values extends NonEmptyArray<unknown>>(
  ...values: Values
): TypePredicateFn<UnionOf<Values>> => {
  if (!values.length) {
    throw new Error('Values not provided');
  }

  return (input: unknown): input is UnionOf<Values> => values.some((value) => Object.is(input, value));
};
