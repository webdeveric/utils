import { optional } from './factory/optional.js';
import { isObject } from './isObject.js';

/**
 * Determine if `input` is `undefined` or a non-null object.
 *
 * @example
 * ```ts
 * isOptionalObject(undefined); // true
 * isOptionalObject(null); // false
 * ```
 */
export const isOptionalObject = optional(isObject);
