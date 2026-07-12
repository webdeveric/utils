import { everyItem } from './factory/everyItem.js';
import { isNull } from './isNull.js';

/**
 * Determine if `input` is an array containing only `null` values.
 *
 * @example
 * ```ts
 * isNullArray([null, null]); // true
 * isNullArray([null, undefined]); // false
 * ```
 */
export const isNullArray = everyItem(isNull);
