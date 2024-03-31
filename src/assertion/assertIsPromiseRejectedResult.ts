import { isPromiseRejectedResult } from '../predicate/isPromiseRejectedResult.js';

import { getError } from './getError.js';

export function assertIsPromiseRejectedResult(
  input: unknown,
  error: string | Error = 'input is not a promise rejected result',
): asserts input is PromiseRejectedResult {
  if (!isPromiseRejectedResult(input)) {
    throw getError(error);
  }
}
