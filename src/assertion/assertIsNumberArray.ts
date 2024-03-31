import { isNumberArray } from '../predicate/isNumberArray.js';

import { getError } from './getError.js';

export function assertIsNumberArray(
  input: unknown,
  error: string | Error = 'input is not an array of number',
): asserts input is number[] {
  if (!isNumberArray(input)) {
    throw getError(error);
  }
}
