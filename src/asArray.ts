/**
 * Ensure `data` is an array, wrapping it in one if it isn't already.
 *
 * @example
 * ```ts
 * asArray(1); // [1]
 * asArray([1, 2]); // [1, 2]
 * ```
 */
export function asArray<T>(data: T | T[]): T[] {
  return Array.isArray(data) ? data : [data];
}
