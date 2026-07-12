import { isNumericValue } from '../predicate/isNumericValue.js';

import { getError } from './getError.js';

import type { NumericValue } from '../types/common.js';

/**
 * Assert that `input` is a number, bigint, or numeric string.
 *
 * @example
 * ```ts
 * assertIsNumericValue(42); // does not throw
 * assertIsNumericValue('42'); // does not throw
 * assertIsNumericValue(42n); // does not throw
 * assertIsNumericValue('abc'); // throws TypeError: input is not a numerical value
 * ```
 */
export function assertIsNumericValue(
  input: unknown,
  error: string | Error = 'input is not a numerical value',
): asserts input is NumericValue {
  if (!isNumericValue(input)) {
    throw getError(error);
  }
}
