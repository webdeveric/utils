import { isIntString } from '../predicate/isIntString.js';

import { getError } from './getError.js';

import type { NumericString } from '../types/common.js';

/**
 * Assert that `input` is a string representing an integer.
 *
 * @example
 * ```ts
 * assertIsIntString('42'); // does not throw
 * assertIsIntString('42.5'); // throws TypeError: input is not an integer string
 * ```
 */
export function assertIsIntString(
  input: unknown,
  error: string | Error = 'input is not an integer string',
): asserts input is NumericString {
  if (!isIntString(input)) {
    throw getError(error);
  }
}
