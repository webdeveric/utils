import { everyItem } from './factory/everyItem.js';
import { isUndefined } from './isUndefined.js';

/**
 * Determine if `input` is an array of `undefined` values.
 *
 * @example
 * ```ts
 * isUndefinedArray([undefined, undefined]); // true
 * isUndefinedArray([undefined, null]); // false
 * ```
 */
export const isUndefinedArray = everyItem(isUndefined);
