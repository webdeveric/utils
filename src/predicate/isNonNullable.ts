/**
 * Determine if `input` is not `null` or `undefined`.
 *
 * @example
 * ```ts
 * isNonNullable(42); // true
 * isNonNullable(null); // false
 * ```
 */
export const isNonNullable = <T>(input: T): input is NonNullable<T> => typeof input !== 'undefined' && input !== null;
