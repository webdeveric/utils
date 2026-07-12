import { isPromiseRejectedResult } from '../predicate/isPromiseRejectedResult.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a rejected `Promise` result.
 *
 * @example
 * ```ts
 * const [result] = await Promise.allSettled([Promise.reject(new Error('fail'))]);
 *
 * assertIsPromiseRejectedResult(result); // does not throw
 * assertIsPromiseRejectedResult({ status: 'fulfilled' }); // throws TypeError: input is not a promise rejected result
 * ```
 */
export function assertIsPromiseRejectedResult(
  input: unknown,
  error: string | Error = 'input is not a promise rejected result',
): asserts input is PromiseRejectedResult {
  if (!isPromiseRejectedResult(input)) {
    throw getError(error);
  }
}
