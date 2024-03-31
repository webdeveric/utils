import { isDigitsString } from '../predicate/isDigitsString.js';

import { getError } from './getError.js';

import type { NumericString } from '../types/common.js';

export function assertIsDigitsString(
  input: unknown,
  error: string | Error = 'input is not a string of integers only',
): asserts input is NumericString {
  if (!isDigitsString(input)) {
    throw getError(error);
  }
}
