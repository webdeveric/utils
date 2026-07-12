import { isLengthAware } from '../predicate/isLengthAware.js';

import { getError } from './getError.js';

/**
 * Assert that `input` has a numeric `length` property.
 *
 * @example
 * ```ts
 * assertIsLengthAware('hello'); // does not throw, strings have a numeric length
 * assertIsLengthAware(42); // throws TypeError: input is not length aware
 * ```
 */
export function assertIsLengthAware(
  input: unknown,
  error: string | Error = 'input is not length aware',
): asserts input is { length: number } {
  if (!isLengthAware(input)) {
    throw getError(error);
  }
}
