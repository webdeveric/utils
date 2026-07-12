/**
 * Determine if `input` is a symbol.
 *
 * @example
 * ```ts
 * isSymbol(Symbol('id')); // true
 * isSymbol('id'); // false
 * ```
 */
export const isSymbol = (input: unknown): input is symbol => typeof input === 'symbol';
