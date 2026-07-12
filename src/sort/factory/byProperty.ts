import type { CompareFn } from '../../types/functions.js';

/**
 * Create a comparator that sorts by the value at the given object `property`, using `compareFn` to compare those values.
 *
 * @example
 * ```ts
 * [{ age: 30 }, { age: 20 }].sort(byProperty(bySubtraction, 'age')); // [{ age: 20 }, { age: 30 }]
 * ```
 */
export const byProperty =
  <T extends object, K extends keyof T = keyof T>(compareFn: CompareFn<T[K]>, property: K): CompareFn<T> =>
  (left, right) =>
    compareFn(left[property], right[property]);
