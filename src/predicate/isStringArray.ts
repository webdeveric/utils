import { everyItem } from './factory/everyItem.js';
import { isString } from './isString.js';

/**
 * Determine if `input` is an array of strings.
 *
 * @example
 * ```ts
 * isStringArray(['a', 'b']); // true
 * isStringArray(['a', 1]); // false
 * ```
 */
export const isStringArray = everyItem(isString);
