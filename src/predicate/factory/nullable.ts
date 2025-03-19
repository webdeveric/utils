import type { TypePredicateFn } from '../../types/functions.js';

export const nullable =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T | null> =>
  (input: unknown): input is T | null =>
    input === null || predicate(input);
