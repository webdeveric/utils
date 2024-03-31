import { isNumericValue } from '../predicate/isNumericValue.js';

import { getError } from './getError.js';

import type { NumericValue } from '../types/common.js';

export function assertIsNumericValue(
  input: unknown,
  error: string | Error = 'input is not a numerical value',
): asserts input is NumericValue {
  if (!isNumericValue(input)) {
    throw getError(error);
  }
}
