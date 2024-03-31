import { isFiniteNumber } from '../predicate/isFiniteNumber.js';

import { getError } from './getError.js';

export function assertIsFiniteNumber(
  input: unknown,
  error: string | Error = 'input is not a finite number',
): asserts input is number {
  if (!isFiniteNumber(input)) {
    throw getError(error);
  }
}
