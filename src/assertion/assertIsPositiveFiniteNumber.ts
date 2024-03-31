import { isPositiveFiniteNumber } from '../predicate/isPositiveFiniteNumber.js';

import { getError } from './getError.js';

export function assertIsPositiveFiniteNumber(
  input: unknown,
  error: string | Error = 'input is not a positive finite number',
): asserts input is number {
  if (!isPositiveFiniteNumber(input)) {
    throw getError(error);
  }
}
