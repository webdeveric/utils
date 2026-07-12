import { isPositiveFiniteNumber } from '../predicate/isPositiveFiniteNumber.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a positive, finite number.
 *
 * @example
 * ```ts
 * assertIsPositiveFiniteNumber(42); // does not throw
 * assertIsPositiveFiniteNumber(-1); // throws TypeError: input is not a positive finite number
 * ```
 */
export function assertIsPositiveFiniteNumber(
  input: unknown,
  error: string | Error = 'input is not a positive finite number',
): asserts input is number {
  if (!isPositiveFiniteNumber(input)) {
    throw getError(error);
  }
}
