import { everyItem } from './factory/everyItem.js';
import { isNumber } from './isNumber.js';

/**
 * Determine if `input` is an array of numbers.
 *
 * @example
 * ```ts
 * isNumberArray([1, 2, 3]); // true
 * isNumberArray([1, '2', 3]); // false
 * ```
 */
export const isNumberArray = everyItem(isNumber);
