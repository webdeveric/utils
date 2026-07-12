import { isSafeInteger } from '../predicate/isSafeInteger.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a safe integer.
 *
 * @example
 * ```ts
 * assertIsSafeInteger(42); // does not throw
 * assertIsSafeInteger(2 ** 53); // throws TypeError: input is not a safe integer
 * ```
 */
export function assertIsSafeInteger(
  input: unknown,
  error: string | Error = 'input is not a safe integer',
): asserts input is number {
  if (!isSafeInteger(input)) {
    throw getError(error);
  }
}
