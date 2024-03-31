import { isOptionalString } from '../predicate/isOptionalString.js';

import { getError } from './getError.js';

export function assertIsOptionalString(
  input: unknown,
  error: string | Error = 'input is not an optional string',
): asserts input is string | undefined {
  if (!isOptionalString(input)) {
    throw getError(error);
  }
}
