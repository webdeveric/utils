import { isPositiveInteger } from '../predicate/isPositiveInteger.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a positive integer.
 *
 * @example
 * ```ts
 * assertIsPositiveInteger(42); // does not throw
 * assertIsPositiveInteger(-1); // throws TypeError: input is not a positive integer
 * ```
 */
export function assertIsPositiveInteger(
  input: unknown,
  error: string | Error = 'input is not a positive integer',
): asserts input is number {
  if (!isPositiveInteger(input)) {
    throw getError(error);
  }
}
