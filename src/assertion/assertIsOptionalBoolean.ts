import { isOptionalBoolean } from '../predicate/isOptionalBoolean.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a boolean or `undefined`.
 *
 * @example
 * ```ts
 * assertIsOptionalBoolean(true); // does not throw
 * assertIsOptionalBoolean(undefined); // does not throw
 * assertIsOptionalBoolean('true'); // throws TypeError: input is not an optional boolean
 * ```
 */
export function assertIsOptionalBoolean(
  input: unknown,
  error: string | Error = 'input is not an optional boolean',
): asserts input is boolean | undefined {
  if (!isOptionalBoolean(input)) {
    throw getError(error);
  }
}
