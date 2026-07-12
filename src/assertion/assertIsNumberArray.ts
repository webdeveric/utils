import { isNumberArray } from '../predicate/isNumberArray.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is an array of numbers.
 *
 * @example
 * ```ts
 * assertIsNumberArray([1, 2, 3]); // does not throw
 * assertIsNumberArray([1, '2', 3]); // throws TypeError: input is not an array of number
 * ```
 */
export function assertIsNumberArray(
  input: unknown,
  error: string | Error = 'input is not an array of number',
): asserts input is number[] {
  if (!isNumberArray(input)) {
    throw getError(error);
  }
}
