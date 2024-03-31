import { isIntString } from '../predicate/isIntString.js';

import { getError } from './getError.js';

import type { NumericString } from '../types/common.js';

export function assertIsIntString(
  input: unknown,
  error: string | Error = 'input is not an integer string',
): asserts input is NumericString {
  if (!isIntString(input)) {
    throw getError(error);
  }
}
