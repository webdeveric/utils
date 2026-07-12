import { isBooleanArray } from '../predicate/isBooleanArray.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is an array of booleans.
 *
 * @example
 * ```ts
 * assertIsBooleanArray([true, false]); // does not throw
 * assertIsBooleanArray([true, 'false']); // throws TypeError: input is not an array of boolean
 * ```
 */
export function assertIsBooleanArray(
  input: unknown,
  error: string | Error = 'input is not an array of boolean',
): asserts input is boolean[] {
  if (!isBooleanArray(input)) {
    throw getError(error);
  }
}
