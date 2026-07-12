/**
 * Get the unique items in `data`.
 *
 * @example
 * ```ts
 * uniqueItems([1, 2, 2, 3]); // [1, 2, 3]
 * ```
 */
export function uniqueItems<T>(data: T[]): T[] {
  return [...new Set<T>(data)];
}
