import { isAsyncIterable } from '../predicate/isAsyncIterable.js';

import { getError } from './getError.js';

export function assertIsAsyncIterable(
  input: unknown,
  error: string | Error = 'input is not an AsyncIterable',
): asserts input is AsyncIterable<unknown> {
  if (!isAsyncIterable(input)) {
    throw getError(error);
  }
}
