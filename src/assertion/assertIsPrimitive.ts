import { isPrimitive } from '../predicate/isPrimitive.js';

import { getError } from './getError.js';

import type { Primitive } from '../types/common.js';

export function assertIsPrimitive(
  input: unknown,
  error: string | Error = 'input is not primitive',
): asserts input is Primitive {
  if (!isPrimitive(input)) {
    throw getError(error);
  }
}
