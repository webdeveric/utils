/**
 * Determine if `input` is a finite number.
 *
 * @example
 * ```ts
 * isFiniteNumber(42); // true
 * isFiniteNumber(Infinity); // false
 * ```
 */
export const isFiniteNumber = (input: unknown): input is number => Number.isFinite(input);
