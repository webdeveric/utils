import type { CompareFn } from '../../types/functions.js';

export const byReverseOf =
  <T>(compareFn: CompareFn<T>): CompareFn<T> =>
  (left, right) =>
    0 - compareFn(left, right);
