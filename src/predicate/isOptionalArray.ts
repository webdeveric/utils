import { optional } from './factory/optional.js';
import { isArray } from './isArray.js';

/**
 * Determine if `input` is `undefined` or an array.
 *
 * @example
 * ```ts
 * isOptionalArray(undefined); // true
 * isOptionalArray(null); // false
 * ```
 */
export const isOptionalArray = optional(isArray);
