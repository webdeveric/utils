/**
 * Get the internal `[[Class]]` type of `input`, e.g. `'String'`, `'Array'`, `'Null'`.
 *
 * @example
 * ```ts
 * getType([]); // 'Array'
 * getType(null); // 'Null'
 * ```
 */
export function getType(input: unknown): string {
  return Object.prototype.toString.call(input).slice(8, -1);
}
