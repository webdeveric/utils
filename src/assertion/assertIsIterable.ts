import { isIterable } from '../predicate/isIterable.js';

import { getError } from './getError.js';

export function assertIsIterable<Type>(
  input: unknown,
  error: string | Error = 'input is not an Iterable',
): asserts input is Iterable<Type> {
  if (!isIterable<Type>(input)) {
    throw getError(error);
  }
}
