import type { TypePredicateFn } from '../types/functions.js';

export const everyItem =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T[]> =>
  (input: unknown): input is T[] =>
    Array.isArray(input) && input.every(predicate);
