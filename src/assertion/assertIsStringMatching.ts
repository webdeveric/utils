import { matching } from '../predicate/factory/matching.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a string that matches the given `pattern`.
 *
 * @example
 * ```ts
 * assertIsStringMatching('hello', /^h/); // does not throw
 * assertIsStringMatching('world', /^h/); // throws TypeError: input is not a string that matches the pattern
 * ```
 */
export function assertIsStringMatching(
  input: unknown,
  pattern: RegExp,
  error: string | Error = 'input is not a string that matches the pattern',
): asserts input is string {
  if (!matching(pattern)(input)) {
    throw getError(error);
  }
}
