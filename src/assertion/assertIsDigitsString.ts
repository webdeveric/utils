import { isDigitsString } from '../predicate/isDigitsString.js';

import { getError } from './getError.js';

import type { NumericString } from '../types/common.js';

/**
 * Assert that `input` is a string that contains digits only.
 *
 * @example
 * ```ts
 * assertIsDigitsString('12345'); // does not throw
 * assertIsDigitsString('123.45'); // throws TypeError: input is not a string of integers only
 * ```
 */
export function assertIsDigitsString(
  input: unknown,
  error: string | Error = 'input is not a string of integers only',
): asserts input is NumericString {
  if (!isDigitsString(input)) {
    throw getError(error);
  }
}
