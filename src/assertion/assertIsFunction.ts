/* eslint-disable @typescript-eslint/ban-types */
import { isFunction } from '../predicate/isFunction.js';

import { getError } from './getError.js';

export function assertIsFunction(
  input: unknown,
  error: string | Error = 'input is not a function',
): asserts input is Function {
  if (!isFunction(input)) {
    throw getError(error);
  }
}
