import type { CompareFn } from '../../types/functions.js';

/**
 * Create a comparator that reverses the ordering produced by the given `compareFn`.
 *
 * @example
 * ```ts
 * [1, 2, 3].sort(byReverseOf(bySubtraction)); // [3, 2, 1]
 * ```
 */
export const byReverseOf =
  <T>(compareFn: CompareFn<T>): CompareFn<T> =>
  (left, right) =>
    0 - compareFn(left, right);
