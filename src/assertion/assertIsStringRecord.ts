import { isStringRecord } from '../predicate/isStringRecord.js';

import { getError } from './getError.js';

import type { StringRecord } from '../types/records.js';

export function assertIsStringRecord(
  input: unknown,
  error: string | Error = 'input is not a string record',
): asserts input is StringRecord {
  if (!isStringRecord(input)) {
    throw getError(error);
  }
}
