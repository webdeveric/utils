import { optional } from './factory/optional.js';
import { isNumber } from './isNumber.js';

/**
 * Determine if `input` is `undefined` or a number.
 *
 * @example
 * ```ts
 * isOptionalNumber(undefined); // true
 * isOptionalNumber(null); // false
 * ```
 */
export const isOptionalNumber = optional(isNumber);
