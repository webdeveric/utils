import { isSymbolArray } from '../predicate/isSymbolArray.js';

import { getError } from './getError.js';

export function assertIsSymbolArray(
  input: unknown,
  error: string | Error = 'input is not an array of symbol',
): asserts input is symbol[] {
  if (!isSymbolArray(input)) {
    throw getError(error);
  }
}
