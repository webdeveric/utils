import { isNullArray } from '../predicate/isNullArray.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is an array of `null` values.
 *
 * @example
 * ```ts
 * assertIsNullArray([null, null]); // does not throw
 * assertIsNullArray([null, undefined]); // throws TypeError: input is not an array of null
 * ```
 */
export function assertIsNullArray(
  input: unknown,
  error: string | Error = 'input is not an array of null',
): asserts input is null[] {
  if (!isNullArray(input)) {
    throw getError(error);
  }
}
