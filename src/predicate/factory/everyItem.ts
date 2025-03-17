import type { TypePredicateFn } from '../../types/functions.js';

export const everyItem =
  <Type>(predicate: TypePredicateFn<Type>): TypePredicateFn<Type[]> =>
  (input: unknown): input is Type[] =>
    Array.isArray(input) && input.every(predicate);
