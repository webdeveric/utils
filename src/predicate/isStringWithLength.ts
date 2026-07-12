/**
 * Determine if `input` is a string with a length greater than 0.
 *
 * @example
 * ```ts
 * isStringWithLength('hello'); // true
 * isStringWithLength(''); // false
 * ```
 */
export const isStringWithLength = (input: unknown): input is string => typeof input === 'string' && input.length > 0;
