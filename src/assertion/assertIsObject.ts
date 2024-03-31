import { isObject } from '../predicate/isObject.js';

import { getError } from './getError.js';

import type { UnknownRecord } from '../types/records.js';

export function assertIsObject<T extends UnknownRecord = UnknownRecord>(
  input: unknown,
  error: string | Error = 'input is not an object',
): asserts input is T {
  if (!isObject<T>(input)) {
    throw getError(error);
  }
}
