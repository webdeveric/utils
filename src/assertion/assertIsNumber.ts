import { isNumber } from '../predicate/isNumber.js';

import { getError } from './getError.js';

export function assertIsNumber(
  input: unknown,
  error: string | Error = 'input is not a number',
): asserts input is number {
  if (!isNumber(input)) {
    throw getError(error);
  }
}
