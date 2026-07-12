import { everyItem } from './factory/everyItem.js';
import { isBoolean } from './isBoolean.js';

/**
 * Determine if `input` is an array of booleans.
 *
 * @example
 * ```ts
 * isBooleanArray([true, false]); // true
 * isBooleanArray([true, 1]); // false
 * ```
 */
export const isBooleanArray = everyItem(isBoolean);
