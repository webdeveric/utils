import { isSymbolArray } from '../predicate/isSymbolArray.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is an array of symbols.
 *
 * @example
 * ```ts
 * assertIsSymbolArray([Symbol('a'), Symbol('b')]); // does not throw
 * assertIsSymbolArray([Symbol('a'), 'b']); // throws TypeError: input is not an array of symbol
 * ```
 */
export function assertIsSymbolArray(
  input: unknown,
  error: string | Error = 'input is not an array of symbol',
): asserts input is symbol[] {
  if (!isSymbolArray(input)) {
    throw getError(error);
  }
}
