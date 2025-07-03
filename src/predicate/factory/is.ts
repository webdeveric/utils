import type { TypePredicateFn } from '../../types/functions.js';

/**
 * Use `Object.is()` to compare `input` against allowed values.
 */
export const is =
  <const T extends unknown[]>(...values: T): TypePredicateFn<T[number]> =>
  (input: unknown): input is T[number] =>
    values.some((value) => Object.is(input, value));
