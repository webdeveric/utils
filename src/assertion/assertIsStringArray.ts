import { isStringArray } from '../predicate/isStringArray.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is an array of strings.
 *
 * @example
 * ```ts
 * assertIsStringArray(['a', 'b']); // does not throw
 * assertIsStringArray(['a', 42]); // throws TypeError: input is not an array of string
 * ```
 */
export function assertIsStringArray(
  input: unknown,
  error: string | Error = 'input is not an array of string',
): asserts input is string[] {
  if (!isStringArray(input)) {
    throw getError(error);
  }
}
