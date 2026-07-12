/**
 * Determine if `input` is `null` or `undefined`.
 *
 * @example
 * ```ts
 * isNullish(null); // true
 * isNullish(0); // false
 * ```
 */
export const isNullish = (input: unknown): input is null | undefined => input == null;
