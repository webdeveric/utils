import { isPositiveFiniteNumber } from '../predicate/isPositiveFiniteNumber.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a finite number greater than or equal to 1.
 *
 * @example
 * ```ts
 * assertIsNumberGTEOne(1); // does not throw
 * assertIsNumberGTEOne(0.5); // throws TypeError: input is not a number >= 1
 * ```
 */
export function assertIsNumberGTEOne(
  input: unknown,
  error: string | Error = 'input is not a number >= 1',
): asserts input is number {
  if (!isPositiveFiniteNumber(input) || input < 1) {
    throw getError(error);
  }
}
