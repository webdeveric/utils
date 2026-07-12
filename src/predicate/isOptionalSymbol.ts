import { optional } from './factory/optional.js';
import { isSymbol } from './isSymbol.js';

/**
 * Determine if `input` is `undefined` or a symbol.
 *
 * @example
 * ```ts
 * isOptionalSymbol(undefined); // true
 * isOptionalSymbol(null); // false
 * ```
 */
export const isOptionalSymbol = optional(isSymbol);
