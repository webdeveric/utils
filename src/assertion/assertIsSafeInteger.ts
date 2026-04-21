import { isSafeInteger } from '../predicate/isSafeInteger.js';

import { getError } from './getError.js';

export function assertIsSafeInteger(
  input: unknown,
  error: string | Error = 'input is not a safe integer',
): asserts input is number {
  if (!isSafeInteger(input)) {
    throw getError(error);
  }
}
