import { isBooleanArray } from '../predicate/isBooleanArray.js';

import { getError } from './getError.js';

export function assertIsBooleanArray(
  input: unknown,
  error: string | Error = 'input is not an array of boolean',
): asserts input is boolean[] {
  if (!isBooleanArray(input)) {
    throw getError(error);
  }
}
