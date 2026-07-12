/**
 * Determine if `input` is an array.
 *
 * @example
 * ```ts
 * isArray([1, 2, 3]); // true
 * isArray('not an array'); // false
 * ```
 */
export const isArray = (input: unknown): input is unknown[] => Array.isArray(input);
