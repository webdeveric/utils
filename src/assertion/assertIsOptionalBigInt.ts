import { isOptionalBigInt } from '../predicate/isOptionalBigInt.js';

import { getError } from './getError.js';

export function assertIsOptionalBigInt(
  input: unknown,
  error: string | Error = 'input is not an optional bigint',
): asserts input is bigint | undefined {
  if (!isOptionalBigInt(input)) {
    throw getError(error);
  }
}
