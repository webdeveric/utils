import { isSizeAware } from '../predicate/isSizeAware.js';

import { getError } from './getError.js';

/**
 * Assert that `input` has a numeric `size` property.
 *
 * @example
 * ```ts
 * assertIsSizeAware(new Set([1, 2, 3])); // does not throw
 * assertIsSizeAware(42); // throws TypeError: input is not size aware
 * ```
 */
export function assertIsSizeAware(
  input: unknown,
  error: string | Error = 'input is not size aware',
): asserts input is { size: number } {
  if (!isSizeAware(input)) {
    throw getError(error);
  }
}
