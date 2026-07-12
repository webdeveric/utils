/**
 * Determine if `input` is a string, number, or symbol.
 *
 * @example
 * ```ts
 * isPropertyKey('key'); // true
 * isPropertyKey({}); // false
 * ```
 */
export const isPropertyKey = (input: unknown): input is PropertyKey =>
  typeof input === 'string' || typeof input === 'number' || typeof input === 'symbol';
