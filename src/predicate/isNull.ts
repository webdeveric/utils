/**
 * Determine if `input` is `null`.
 *
 * @example
 * ```ts
 * isNull(null); // true
 * isNull(undefined); // false
 * ```
 */
export const isNull = (input: unknown): input is null => input === null;
