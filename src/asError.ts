/**
 * Ensure `input` is an `Error` instance, converting it to one if it isn't already.
 *
 * @example
 * ```ts
 * asError('Oops'); // Error('Oops')
 * asError(new Error('Oops')); // the same Error instance
 * ```
 */
export function asError(input: unknown): Error {
  return input instanceof Error ? input : new Error(String(input));
}
