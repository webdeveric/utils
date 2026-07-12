import { isAsyncIterable } from '../predicate/isAsyncIterable.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is an `AsyncIterable`.
 *
 * @example
 * ```ts
 * async function* gen() {
 *   yield 1;
 * }
 *
 * assertIsAsyncIterable(gen()); // does not throw
 * assertIsAsyncIterable([1, 2, 3]); // throws TypeError: input is not an AsyncIterable
 * ```
 */
export function assertIsAsyncIterable(
  input: unknown,
  error: string | Error = 'input is not an AsyncIterable',
): asserts input is AsyncIterable<unknown> {
  if (!isAsyncIterable(input)) {
    throw getError(error);
  }
}
