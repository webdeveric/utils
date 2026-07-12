import { isOptionalNumber } from '../predicate/isOptionalNumber.js';

import { getError } from './getError.js';

/**
 * Assert that `input` is a number or `undefined`.
 *
 * @example
 * ```ts
 * assertIsOptionalNumber(42); // does not throw
 * assertIsOptionalNumber(undefined); // does not throw
 * assertIsOptionalNumber('42'); // throws TypeError: input is not an optional number
 * ```
 */
export function assertIsOptionalNumber(
  input: unknown,
  error: string | Error = 'input is not an optional number',
): asserts input is number | undefined {
  if (!isOptionalNumber(input)) {
    throw getError(error);
  }
}
