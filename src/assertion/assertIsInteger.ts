import { isInteger } from '../predicate/isInteger.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is an integer.
 *
 * @example
 * ```ts
 * assertIsInteger(42); // does not throw
 * assertIsInteger(42.5); // throws TypeError: input is not an integer
 * ```
 */
export function assertIsInteger(
  input: unknown,
  error: string | Error = 'input is not an integer',
): asserts input is number {
  if (!isInteger(input)) {
    throw getError(error);
  }
}
