import { isSizeAware } from '../predicate/isSizeAware.js';

import { getError } from './getError.js';

export function assertIsSizeAware(
  input: unknown,
  error: string | Error = 'input is not size aware',
): asserts input is { size: number } {
  if (!isSizeAware(input)) {
    throw getError(error);
  }
}
