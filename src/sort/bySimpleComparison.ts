/**
 * Compare two values using `<`, `>`, and `===`.
 *
 * @example
 * ```ts
 * [3, 1, 2].sort(bySimpleComparison); // [1, 2, 3]
 * ```
 */
export const bySimpleComparison = <T>(left: T, right: T): number => {
  return left === right ? 0 : left > right ? 1 : -1;
};
