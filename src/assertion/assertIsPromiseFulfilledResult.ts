import { isPromiseFulfilledResult } from '../predicate/isPromiseFulfilledResult.js';

import { getError } from './getError.js';

export function assertIsPromiseFulfilledResult<T>(
  input: unknown,
  error: string | Error = 'input is not a promise fulfilled result',
): asserts input is PromiseFulfilledResult<T> {
  if (!isPromiseFulfilledResult(input)) {
    throw getError(error);
  }
}
