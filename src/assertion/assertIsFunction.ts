import { isFunction } from '../predicate/isFunction.js';

import { getError } from './getError.js';

import type { AnyFunction } from '../types/common.js';

export function assertIsFunction<Func extends AnyFunction = AnyFunction>(
  input: unknown,
  error: string | Error = 'input is not a function',
): asserts input is Func {
  if (!isFunction<Func>(input)) {
    throw getError(error);
  }
}
