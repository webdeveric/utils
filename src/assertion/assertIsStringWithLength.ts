import { isStringWithLength } from '../predicate/isStringWithLength.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a non-empty string.
 *
 * @example
 * ```ts
 * assertIsStringWithLength('hello'); // does not throw
 * assertIsStringWithLength(''); // throws TypeError: input is not a string with length
 * ```
 */
export function assertIsStringWithLength(
  input: unknown,
  error: string | Error = 'input is not a string with length',
): asserts input is string {
  if (!isStringWithLength(input)) {
    throw getError(error);
  }
}
