import { isBoolean } from '../predicate/isBoolean.js';

import { getError } from './getError.js';

export function assertIsBoolean(
  input: unknown,
  error: string | Error = 'input is not a boolean',
): asserts input is boolean {
  if (!isBoolean(input)) {
    throw getError(error);
  }
}
