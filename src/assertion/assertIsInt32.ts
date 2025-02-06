import { isInt32 } from '../predicate/isInt32.js';

import { getError } from './getError.js';

import type { Int32 } from '../types/numbers.js';

export function assertIsInt32(input: unknown, error: string | Error = 'input is not an Int32'): asserts input is Int32 {
  if (!isInt32(input)) {
    throw getError(error);
  }
}
