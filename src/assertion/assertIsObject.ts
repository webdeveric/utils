import { isObject } from '../predicate/isObject.js';

import { getError } from './getError.js';

export function assertIsObject(
  input: unknown,
  error: string | Error = 'input is not an object',
): asserts input is object {
  if (!isObject(input)) {
    throw getError(error);
  }
}
