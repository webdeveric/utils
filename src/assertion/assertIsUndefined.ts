import { isUndefined } from '../predicate/isUndefined.js';

import { getError } from './getError.js';

export function assertIsUndefined(
  input: unknown,
  error: string | Error = 'input is not undefined',
): asserts input is undefined {
  if (!isUndefined(input)) {
    throw getError(error);
  }
}
