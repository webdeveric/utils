import { everyItem } from './factory/everyItem.js';
import { isSymbol } from './isSymbol.js';

/**
 * Determine if `input` is an array of symbols.
 *
 * @example
 * ```ts
 * isSymbolArray([Symbol('a'), Symbol('b')]); // true
 * isSymbolArray([Symbol('a'), 'b']); // false
 * ```
 */
export const isSymbolArray = everyItem(isSymbol);
