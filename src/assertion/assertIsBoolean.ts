import { isBoolean } from '../predicate/isBoolean.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a boolean.
 *
 * @example
 * ```ts
 * assertIsBoolean(true); // does not throw
 * assertIsBoolean('true'); // throws TypeError: input is not a boolean
 * ```
 */
export function assertIsBoolean(
  input: unknown,
  error: string | Error = 'input is not a boolean',
): asserts input is boolean {
  if (!isBoolean(input)) {
    throw getError(error);
  }
}
