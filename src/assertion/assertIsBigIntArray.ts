import { isBigIntArray } from '../predicate/isBigIntArray.js';

import { getError } from './getError.js';

export function assertIsBigIntArray(
  input: unknown,
  error: string | Error = 'input is not an array of bigint',
): asserts input is bigint[] {
  if (!isBigIntArray(input)) {
    throw getError(error);
  }
}
