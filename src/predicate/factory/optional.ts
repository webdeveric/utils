import type { TypePredicateFn } from '../../types/functions.js';

export const optional =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T | undefined> =>
  (input: unknown): input is T | undefined =>
    typeof input === 'undefined' || predicate(input);
