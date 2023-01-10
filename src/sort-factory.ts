import type { CompareFn } from './types.js';

export const byProperty =
  <T extends object, K extends keyof T = keyof T>(compareFn: CompareFn<T[K]>, property: K): CompareFn<T> =>
  (left, right) =>
    compareFn(left[property], right[property]);

export const byReverseOf =
  <T>(compareFn: CompareFn<T>): CompareFn<T> =>
  (left, right) =>
    0 - compareFn(left, right);
