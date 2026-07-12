/**
 * Determine if `input` is a safe integer.
 *
 * @example
 * ```ts
 * isSafeInteger(42); // true
 * isSafeInteger(2 ** 53); // false
 * ```
 */
export const isSafeInteger = (input: unknown): input is number => Number.isSafeInteger(input);
