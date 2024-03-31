import { isPositiveInteger } from '../predicate/isPositiveInteger.js';

import { getError } from './getError.js';

export function assertIsPositiveInteger(
  input: unknown,
  error: string | Error = 'input is not a positive integer',
): asserts input is number {
  if (!isPositiveInteger(input)) {
    throw getError(error);
  }
}
