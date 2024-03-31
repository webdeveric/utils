import { isNumericValueArray } from '../predicate/isNumericValueArray.js';

import { getError } from './getError.js';

import type { NumericValue } from '../types/common.js';

export function assertIsNumericValueArray(
  input: unknown,
  error: string | Error = 'input is not a numerical value array',
): asserts input is NumericValue[] {
  if (!isNumericValueArray(input)) {
    throw getError(error);
  }
}
