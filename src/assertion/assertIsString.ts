import { isString } from '../predicate/isString.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a string.
 *
 * @example
 * ```ts
 * assertIsString('hello'); // does not throw
 * assertIsString(42); // throws TypeError: input is not a string
 * ```
 */
export function assertIsString(
  input: unknown,
  error: string | Error = 'input is not a string',
): asserts input is string {
  if (!isString(input)) {
    throw getError(error);
  }
}
