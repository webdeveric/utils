import { isBigInt } from '../predicate/isBigInt.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a `bigint`.
 *
 * @example
 * ```ts
 * assertIsBigInt(10n); // does not throw
 * assertIsBigInt(10); // throws TypeError: input is not a bigint
 * ```
 */
export function assertIsBigInt(
  input: unknown,
  error: string | Error = 'input is not a bigint',
): asserts input is bigint {
  if (!isBigInt(input)) {
    throw getError(error);
  }
}
