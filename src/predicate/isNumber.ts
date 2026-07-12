/**
 * Determine if `input` is a number and not `NaN`.
 *
 * @example
 * ```ts
 * isNumber(42); // true
 * isNumber(NaN); // false
 * ```
 */
export const isNumber = (input: unknown): input is number => typeof input === 'number' && !Number.isNaN(input);
