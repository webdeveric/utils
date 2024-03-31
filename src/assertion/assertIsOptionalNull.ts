import { isOptionalNull } from '../predicate/isOptionalNull.js';

import { getError } from './getError.js';

export function assertIsOptionalNull(
  input: unknown,
  error: string | Error = 'input is not an optional null',
): asserts input is null | undefined {
  if (!isOptionalNull(input)) {
    throw getError(error);
  }
}
