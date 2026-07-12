import { isSymbol } from '../predicate/isSymbol.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a symbol.
 *
 * @example
 * ```ts
 * assertIsSymbol(Symbol('id')); // does not throw
 * assertIsSymbol('id'); // throws TypeError: input is not a symbol
 * ```
 */
export function assertIsSymbol(
  input: unknown,
  error: string | Error = 'input is not a symbol',
): asserts input is symbol {
  if (!isSymbol(input)) {
    throw getError(error);
  }
}
