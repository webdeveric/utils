import { isLengthAware } from '../predicate/isLengthAware.js';

import { getError } from './getError.js';

export function assertIsLengthAware(
  input: unknown,
  error: string | Error = 'input is not length aware',
): asserts input is { length: number } {
  if (!isLengthAware(input)) {
    throw getError(error);
  }
}
