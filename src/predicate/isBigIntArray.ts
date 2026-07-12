import { everyItem } from './factory/everyItem.js';
import { isBigInt } from './isBigInt.js';

/**
 * Determine if `input` is an array of bigints.
 *
 * @example
 * ```ts
 * isBigIntArray([1n, 2n, 3n]); // true
 * isBigIntArray([1, 2, 3]); // false
 * ```
 */
export const isBigIntArray = everyItem(isBigInt);
