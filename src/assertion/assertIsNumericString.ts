import { isNumericString } from '../predicate/isNumericString.js';

import { getError } from './getError.js';

import type { NumericString } from '../types/common.js';

export function assertIsNumericString(
  input: unknown,
  error: string | Error = 'input is not a numeric string',
): asserts input is NumericString {
  if (!isNumericString(input)) {
    throw getError(error);
  }
}
