import { isOptionalBoolean } from '../predicate/isOptionalBoolean.js';

import { getError } from './getError.js';

export function assertIsOptionalBoolean(
  input: unknown,
  error: string | Error = 'input is not an optional boolean',
): asserts input is boolean | undefined {
  if (!isOptionalBoolean(input)) {
    throw getError(error);
  }
}
