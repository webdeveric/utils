import { isNumericValueArray } from '../predicate/isNumericValueArray.js';

import { getError } from './getError.js';

import type { NumericValue } from '../types/common.js';

/**
 * Assert that `input` is an array of numbers, bigints, or numeric strings.
 *
 * @example
 * ```ts
 * assertIsNumericValueArray([1, '2', 3n]); // does not throw
 * assertIsNumericValueArray([1, 'abc']); // throws TypeError: input is not a numerical value array
 * ```
 */
export function assertIsNumericValueArray(
  input: unknown,
  error: string | Error = 'input is not a numerical value array',
): asserts input is NumericValue[] {
  if (!isNumericValueArray(input)) {
    throw getError(error);
  }
}
