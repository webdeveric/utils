import { isUndefinedArray } from '../predicate/isUndefinedArray.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is an array of `undefined` values.
 *
 * @example
 * ```ts
 * assertIsUndefinedArray([undefined, undefined]); // does not throw
 * assertIsUndefinedArray([undefined, null]); // throws TypeError: input is not an array of undefined
 * ```
 */
export function assertIsUndefinedArray(
  input: unknown,
  error: string | Error = 'input is not an array of undefined',
): asserts input is undefined[] {
  if (!isUndefinedArray(input)) {
    throw getError(error);
  }
}
