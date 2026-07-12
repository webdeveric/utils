/**
 * Determine if `input` is a bigint.
 *
 * @example
 * ```ts
 * isBigInt(42n); // true
 * isBigInt(42); // false
 * ```
 */
export const isBigInt = (input: unknown): input is bigint => typeof input === 'bigint';
