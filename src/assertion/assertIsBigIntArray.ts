import { isBigIntArray } from '../predicate/isBigIntArray.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is an array of `bigint`.
 *
 * @example
 * ```ts
 * assertIsBigIntArray([1n, 2n, 3n]); // does not throw
 * assertIsBigIntArray([1, 2, 3]); // throws TypeError: input is not an array of bigint
 * ```
 */
export function assertIsBigIntArray(
  input: unknown,
  error: string | Error = 'input is not an array of bigint',
): asserts input is bigint[] {
  if (!isBigIntArray(input)) {
    throw getError(error);
  }
}
