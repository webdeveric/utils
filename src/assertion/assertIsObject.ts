import { isObject } from '../predicate/isObject.js';

import { getError } from './getError.js';

import type { UnknownRecord } from '../types/records.js';

export function assertIsObject(
  input: unknown,
  error: string | Error = 'input is not an object',
): asserts input is UnknownRecord {
  if (!isObject(input)) {
    throw getError(error);
  }
}
