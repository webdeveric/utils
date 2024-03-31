import { isNullArray } from '../predicate/isNullArray.js';

import { getError } from './getError.js';

export function assertIsNullArray(
  input: unknown,
  error: string | Error = 'input is not an array of null',
): asserts input is null[] {
  if (!isNullArray(input)) {
    throw getError(error);
  }
}
