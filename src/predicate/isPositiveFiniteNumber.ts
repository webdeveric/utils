import { isFiniteNumber } from './isFiniteNumber.js';

/**
 * Determine if `input` is a finite number greater than or equal to 0.
 *
 * @example
 * ```ts
 * isPositiveFiniteNumber(42); // true
 * isPositiveFiniteNumber(-1); // false
 * ```
 */
export const isPositiveFiniteNumber = (input: unknown): input is number => isFiniteNumber(input) && input >= 0;
