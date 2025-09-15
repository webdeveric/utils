import type { Nullish } from '../../types/common.js';
import type { TypePredicateFn } from '../../types/functions.js';

export const nullish =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<Nullish<T>> =>
  (input: unknown): input is Nullish<T> =>
    input == null || predicate(input);
