import { isUndefinedArray } from '../predicate/isUndefinedArray.js';

import { getError } from './getError.js';

export function assertIsUndefinedArray(
  input: unknown,
  error: string | Error = 'input is not an array of undefined',
): asserts input is undefined[] {
  if (!isUndefinedArray(input)) {
    throw getError(error);
  }
}
