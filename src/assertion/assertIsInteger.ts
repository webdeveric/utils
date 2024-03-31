import { isInteger } from '../predicate/isInteger.js';

import { getError } from './getError.js';

export function assertIsInteger(
  input: unknown,
  error: string | Error = 'input is not an integer',
): asserts input is number {
  if (!isInteger(input)) {
    throw getError(error);
  }
}
