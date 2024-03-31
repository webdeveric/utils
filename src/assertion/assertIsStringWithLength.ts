import { isStringWithLength } from '../predicate/isStringWithLength.js';

import { getError } from './getError.js';

export function assertIsStringWithLength(
  input: unknown,
  error: string | Error = 'input is not a string with length',
): asserts input is string {
  if (!isStringWithLength(input)) {
    throw getError(error);
  }
}
