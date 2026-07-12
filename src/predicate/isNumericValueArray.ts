import { everyItem } from './factory/everyItem.js';
import { isNumericValue } from './isNumericValue.js';

/**
 * Determine if `input` is an array of numeric values.
 *
 * @example
 * ```ts
 * isNumericValueArray([1, '2', 3n]); // true
 * isNumericValueArray([1, 'abc']); // false
 * ```
 */
export const isNumericValueArray = everyItem(isNumericValue);
