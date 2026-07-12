import { isOptionalBigInt } from '../predicate/isOptionalBigInt.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a `bigint` or `undefined`.
 *
 * @example
 * ```ts
 * assertIsOptionalBigInt(10n); // does not throw
 * assertIsOptionalBigInt(undefined); // does not throw
 * assertIsOptionalBigInt(10); // throws TypeError: input is not an optional bigint
 * ```
 */
export function assertIsOptionalBigInt(
  input: unknown,
  error: string | Error = 'input is not an optional bigint',
): asserts input is bigint | undefined {
  if (!isOptionalBigInt(input)) {
    throw getError(error);
  }
}
