import { isBigInt } from '../predicate/isBigInt.js';

import { getError } from './getError.js';

export function assertIsBigInt(
  input: unknown,
  error: string | Error = 'input is not a bigint',
): asserts input is bigint {
  if (!isBigInt(input)) {
    throw getError(error);
  }
}
