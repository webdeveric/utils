import { isOptionalString } from '../predicate/isOptionalString.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a string or `undefined`.
 *
 * @example
 * ```ts
 * assertIsOptionalString('hello'); // does not throw
 * assertIsOptionalString(undefined); // does not throw
 * assertIsOptionalString(42); // throws TypeError: input is not an optional string
 * ```
 */
export function assertIsOptionalString(
  input: unknown,
  error: string | Error = 'input is not an optional string',
): asserts input is string | undefined {
  if (!isOptionalString(input)) {
    throw getError(error);
  }
}
