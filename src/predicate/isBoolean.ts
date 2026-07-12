/**
 * Determine if `input` is a boolean.
 *
 * @example
 * ```ts
 * isBoolean(true); // true
 * isBoolean(1); // false
 * ```
 */
export const isBoolean = (input: unknown): input is boolean => typeof input === 'boolean';
