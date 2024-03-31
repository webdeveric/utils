import { isSymbol } from '../predicate/isSymbol.js';

import { getError } from './getError.js';

export function assertIsSymbol(
  input: unknown,
  error: string | Error = 'input is not a symbol',
): asserts input is symbol {
  if (!isSymbol(input)) {
    throw getError(error);
  }
}
