import { isPropertyKey } from '../predicate/isPropertyKey.js';

import { getError } from './getError.js';

export function assertIsPropertyKey(
  input: unknown,
  error: string | Error = 'input is not a property key',
): asserts input is PropertyKey {
  if (!isPropertyKey(input)) {
    throw getError(error);
  }
}
