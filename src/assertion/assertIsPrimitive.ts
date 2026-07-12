import { isPrimitive } from '../predicate/isPrimitive.js';

import { getError } from './getError.js';

import type { Primitive } from '../types/common.js';

/**
 * Assert that `input` is a primitive value.
 *
 * @example
 * ```ts
 * assertIsPrimitive('hello'); // does not throw
 * assertIsPrimitive({}); // throws TypeError: input is not primitive
 * ```
 */
export function assertIsPrimitive(
  input: unknown,
  error: string | Error = 'input is not primitive',
): asserts input is Primitive {
  if (!isPrimitive(input)) {
    throw getError(error);
  }
}
