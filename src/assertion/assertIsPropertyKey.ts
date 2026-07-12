import { isPropertyKey } from '../predicate/isPropertyKey.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a valid property key: a string, number, or symbol.
 *
 * @example
 * ```ts
 * assertIsPropertyKey('key'); // does not throw
 * assertIsPropertyKey(42); // does not throw
 * assertIsPropertyKey(Symbol('key')); // does not throw
 * assertIsPropertyKey({}); // throws TypeError: input is not a property key
 * ```
 */
export function assertIsPropertyKey(
  input: unknown,
  error: string | Error = 'input is not a property key',
): asserts input is PropertyKey {
  if (!isPropertyKey(input)) {
    throw getError(error);
  }
}
