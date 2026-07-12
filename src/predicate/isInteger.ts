/**
 * Determine if `input` is an integer.
 *
 * @example
 * ```ts
 * isInteger(42); // true
 * isInteger(4.2); // false
 * ```
 */
export const isInteger = (input: unknown): input is number => Number.isInteger(input);
