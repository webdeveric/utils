import { isNumber } from '../predicate/isNumber.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a number.
 *
 * @example
 * ```ts
 * assertIsNumber(42); // does not throw
 * assertIsNumber('42'); // throws TypeError: input is not a number
 * ```
 */
export function assertIsNumber(
  input: unknown,
  error: string | Error = 'input is not a number',
): asserts input is number {
  if (!isNumber(input)) {
    throw getError(error);
  }
}
