import { optional } from './factory/optional.js';
import { isString } from './isString.js';

/**
 * Determine if `input` is `undefined` or a string.
 *
 * @example
 * ```ts
 * isOptionalString(undefined); // true
 * isOptionalString(null); // false
 * ```
 */
export const isOptionalString = optional(isString);
