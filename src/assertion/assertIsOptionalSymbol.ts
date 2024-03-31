import { isOptionalSymbol } from '../predicate/isOptionalSymbol.js';

import { getError } from './getError.js';

export function assertIsOptionalSymbol(
  input: unknown,
  error: string | Error = 'input is not an optional symbol',
): asserts input is symbol | undefined {
  if (!isOptionalSymbol(input)) {
    throw getError(error);
  }
}
