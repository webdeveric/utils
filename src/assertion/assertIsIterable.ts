import { isIterable } from '../predicate/isIterable.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is an `Iterable`.
 *
 * @example
 * ```ts
 * assertIsIterable<number>([1, 2, 3]); // does not throw
 * assertIsIterable(42); // throws TypeError: input is not an Iterable
 * ```
 */
export function assertIsIterable<Type>(
  input: unknown,
  error: string | Error = 'input is not an Iterable',
): asserts input is Iterable<Type> {
  if (!isIterable(input)) {
    throw getError(error);
  }
}
