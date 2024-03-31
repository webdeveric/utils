import { isOptionalNumber } from '../predicate/isOptionalNumber.js';

import { getError } from './getError.js';

export function assertIsOptionalNumber(
  input: unknown,
  error: string | Error = 'input is not an optional number',
): asserts input is number | undefined {
  if (!isOptionalNumber(input)) {
    throw getError(error);
  }
}
