/**
 * Get an `Error` instance from `error`, wrapping a string in a `TypeError`.
 *
 * @example
 * ```ts
 * getError('Something went wrong'); // returns new TypeError('Something went wrong')
 * getError(new RangeError('Out of range')); // returns the same RangeError instance
 * ```
 */
export function getError(error: string | Error): Error {
  return error instanceof Error ? error : new TypeError(error);
}
