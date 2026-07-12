import { isNull } from '../predicate/isNull.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is `null`.
 *
 * @example
 * ```ts
 * assertIsNull(null); // does not throw
 * assertIsNull(undefined); // throws TypeError: input is not null
 * ```
 */
export function assertIsNull(input: unknown, error: string | Error = 'input is not null'): asserts input is null {
  if (!isNull(input)) {
    throw getError(error);
  }
}
