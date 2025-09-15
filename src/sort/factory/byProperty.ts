import type { CompareFn } from '../../types/functions.js';

export const byProperty =
  <T extends object, K extends keyof T = keyof T>(compareFn: CompareFn<T[K]>, property: K): CompareFn<T> =>
  (left, right) =>
    compareFn(left[property], right[property]);
