import { isOptionalNull } from '../predicate/isOptionalNull.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is `null` or `undefined`.
 *
 * @example
 * ```ts
 * assertIsOptionalNull(null); // does not throw
 * assertIsOptionalNull(undefined); // does not throw
 * assertIsOptionalNull(0); // throws TypeError: input is not an optional null
 * ```
 */
export function assertIsOptionalNull(
  input: unknown,
  error: string | Error = 'input is not an optional null',
): asserts input is null | undefined {
  if (!isOptionalNull(input)) {
    throw getError(error);
  }
}
