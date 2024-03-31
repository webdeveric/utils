import { isPositiveFiniteNumber } from '../predicate/isPositiveFiniteNumber.js';

import { getError } from './getError.js';

export function assertIsNumberGTEOne(
  input: unknown,
  error: string | Error = 'input is not a number >= 1',
): asserts input is number {
  if (!isPositiveFiniteNumber(input) || input < 1) {
    throw getError(error);
  }
}
