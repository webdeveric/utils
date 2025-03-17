import { matching } from '../predicate/factory/matching.js';

import { getError } from './getError.js';

export function assertIsStringMatching(
  input: unknown,
  pattern: RegExp,
  error: string | Error = 'input is not a string that matches the pattern',
): asserts input is string {
  if (!matching(pattern)(input)) {
    throw getError(error);
  }
}
