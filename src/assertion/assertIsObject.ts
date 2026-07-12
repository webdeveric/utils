import { isObject } from '../predicate/isObject.js';

import { getError } from './getError.js';

import type { UnknownRecord } from '../types/records.js';

/**
 * Assert that `input` is an object.
 *
 * @example
 * ```ts
 * assertIsObject({ a: 1 }); // does not throw
 * assertIsObject(null); // throws TypeError: input is not an object
 * assertIsObject([1, 2, 3]); // throws TypeError: input is not an object
 * ```
 */
export function assertIsObject(
  input: unknown,
  error: string | Error = 'input is not an object',
): asserts input is UnknownRecord {
  if (!isObject(input)) {
    throw getError(error);
  }
}
