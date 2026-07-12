import { isOptionalSymbol } from '../predicate/isOptionalSymbol.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a symbol or `undefined`.
 *
 * @example
 * ```ts
 * assertIsOptionalSymbol(Symbol('id')); // does not throw
 * assertIsOptionalSymbol(undefined); // does not throw
 * assertIsOptionalSymbol('id'); // throws TypeError: input is not an optional symbol
 * ```
 */
export function assertIsOptionalSymbol(
  input: unknown,
  error: string | Error = 'input is not an optional symbol',
): asserts input is symbol | undefined {
  if (!isOptionalSymbol(input)) {
    throw getError(error);
  }
}
