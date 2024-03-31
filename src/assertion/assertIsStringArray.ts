import { isStringArray } from '../predicate/isStringArray.js';

import { getError } from './getError.js';

export function assertIsStringArray(
  input: unknown,
  error: string | Error = 'input is not an array of string',
): asserts input is string[] {
  if (!isStringArray(input)) {
    throw getError(error);
  }
}
