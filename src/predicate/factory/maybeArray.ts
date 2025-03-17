import type { TypePredicateFn } from '../../types/functions.js';

export const maybeArray =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T | T[]> =>
  (input: unknown): input is T | T[] =>
    Array.isArray(input) ? input.every(predicate) : predicate(input);
