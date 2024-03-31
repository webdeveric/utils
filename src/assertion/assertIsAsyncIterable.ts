import { isAsyncIterable } from '../predicate/isAsyncIterable.js';

import { getError } from './getError.js';

export function assertIsAsyncIterable<Type>(
  input: unknown,
  error: string | Error = 'input is not an AsyncIterable',
): asserts input is AsyncIterable<Type> {
  if (!isAsyncIterable<Type>(input)) {
    throw getError(error);
  }
}
