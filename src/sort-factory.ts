import type { CompareFn } from './types.js';

export const byProperty =
  <T extends object>(compareFn: CompareFn<T[keyof T]>, property: keyof T): CompareFn<T> =>
  (left, right) =>
    compareFn(left[property], right[property]);

export const byReverseOf =
  <T>(compareFn: CompareFn<T>): CompareFn<T> =>
  (left, right) =>
    0 - compareFn(left, right);
