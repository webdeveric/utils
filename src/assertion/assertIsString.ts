import { isString } from '../predicate/isString.js';

import { getError } from './getError.js';

export function assertIsString(
  input: unknown,
  error: string | Error = 'input is not a string',
): asserts input is string {
  if (!isString(input)) {
    throw getError(error);
  }
}
