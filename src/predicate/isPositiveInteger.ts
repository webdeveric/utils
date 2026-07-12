import { isInteger } from './isInteger.js';

/**
 * Determine if `input` is an integer greater than or equal to 0.
 *
 * @example
 * ```ts
 * isPositiveInteger(42); // true
 * isPositiveInteger(-1); // false
 * ```
 */
export const isPositiveInteger = (input: unknown): input is number => isInteger(input) && input >= 0;
