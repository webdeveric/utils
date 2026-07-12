import { optional } from './factory/optional.js';
import { isBoolean } from './isBoolean.js';

/**
 * Determine if `input` is `undefined` or a boolean.
 *
 * @example
 * ```ts
 * isOptionalBoolean(undefined); // true
 * isOptionalBoolean(null); // false
 * ```
 */
export const isOptionalBoolean = optional(isBoolean);
