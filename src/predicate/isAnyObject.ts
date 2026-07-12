/**
 * Determine if `input` is any non-null object.
 *
 * @example
 * ```ts
 * isAnyObject({}); // true
 * isAnyObject(null); // false
 * ```
 */
export const isAnyObject = (input: unknown): input is object => input !== null && typeof input === 'object';
