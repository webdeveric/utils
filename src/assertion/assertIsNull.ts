import { isNull } from '../predicate/isNull.js';

import { getError } from './getError.js';

export function assertIsNull(input: unknown, error: string | Error = 'input is not null'): asserts input is null {
  if (!isNull(input)) {
    throw getError(error);
  }
}
