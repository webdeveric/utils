import { isFunction } from '../predicate/isFunction.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a function.
 *
 * @example
 * ```ts
 * assertIsFunction(() => {}); // does not throw
 * assertIsFunction(42); // throws TypeError: input is not a function
 * ```
 */
export function assertIsFunction(
  input: unknown,
  error: string | Error = 'input is not a function',
): asserts input is Function {
  if (!isFunction(input)) {
    throw getError(error);
  }
}
