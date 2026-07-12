import { isUndefined } from '../predicate/isUndefined.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is `undefined`.
 *
 * @example
 * ```ts
 * assertIsUndefined(undefined); // does not throw
 * assertIsUndefined(null); // throws TypeError: input is not undefined
 * ```
 */
export function assertIsUndefined(
  input: unknown,
  error: string | Error = 'input is not undefined',
): asserts input is undefined {
  if (!isUndefined(input)) {
    throw getError(error);
  }
}
