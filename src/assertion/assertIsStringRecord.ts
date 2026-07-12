import { isStringRecord } from '../predicate/isStringRecord.js';

import { getError } from './getError.js';

import type { StringRecord } from '../types/records.js';

/**
 * Assert that `input` is an object whose own properties all have string values.
 *
 * @example
 * ```ts
 * assertIsStringRecord({ a: '1', b: '2' }); // does not throw
 * assertIsStringRecord({ a: 1 }); // throws TypeError: input is not a string record
 * ```
 */
export function assertIsStringRecord(
  input: unknown,
  error: string | Error = 'input is not a string record',
): asserts input is StringRecord {
  if (!isStringRecord(input)) {
    throw getError(error);
  }
}
