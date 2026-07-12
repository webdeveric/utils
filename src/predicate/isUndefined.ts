/**
 * Determine if `input` is `undefined`.
 *
 * @example
 * ```ts
 * isUndefined(undefined); // true
 * isUndefined(null); // false
 * ```
 */
export const isUndefined = (input: unknown): input is undefined => typeof input === 'undefined';
