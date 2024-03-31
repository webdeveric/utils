import type { TypePredicateFn } from '../types/functions.js';

export const maybeNull =
  <T>(predicate: TypePredicateFn<T>): TypePredicateFn<T | null> =>
  (input: unknown): input is T | null =>
    input === null || predicate(input);
