import type { TypePredicateFn } from '../../types/functions.js';

export const matching =
  <T extends string>(pattern: RegExp): TypePredicateFn<T> =>
  (input: unknown): input is T =>
    typeof input === 'string' && pattern.test(input);
