import { isPromiseFulfilledResult } from '../predicate/isPromiseFulfilledResult.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a fulfilled `Promise` result.
 *
 * @example
 * ```ts
 * const [result] = await Promise.allSettled([Promise.resolve(42)]);
 *
 * assertIsPromiseFulfilledResult<number>(result); // does not throw
 * assertIsPromiseFulfilledResult({ status: 'rejected' }); // throws TypeError: input is not a promise fulfilled result
 * ```
 */
export function assertIsPromiseFulfilledResult<T>(
  input: unknown,
  error: string | Error = 'input is not a promise fulfilled result',
): asserts input is PromiseFulfilledResult<T> {
  if (!isPromiseFulfilledResult(input)) {
    throw getError(error);
  }
}
