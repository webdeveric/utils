/**
 * Determine if `input` is a string.
 *
 * @example
 * ```ts
 * isString('hello'); // true
 * isString(42); // false
 * ```
 */
export const isString = (input: unknown): input is string => typeof input === 'string';
