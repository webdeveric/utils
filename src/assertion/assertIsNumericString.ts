import { isNumericString } from '../predicate/isNumericString.js';

import { getError } from './getError.js';

import type { NumericString } from '../types/common.js';

/**
 * Assert that `input` is a string representing a numeric value.
 *
 * @example
 * ```ts
 * assertIsNumericString('3.14'); // does not throw
 * assertIsNumericString('abc'); // throws TypeError: input is not a numeric string
 * ```
 */
export function assertIsNumericString(
  input: unknown,
  error: string | Error = 'input is not a numeric string',
): asserts input is NumericString {
  if (!isNumericString(input)) {
    throw getError(error);
  }
}
