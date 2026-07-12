import { assertIsSafeInteger } from './assertion/assertIsSafeInteger.js';
import { isObject } from './predicate/isObject.js';

import type { RequireAtLeastOne } from './types/records.js';
import type { Pretty } from './types/utils.js';

export type RandomIntOptions = Pretty<
  RequireAtLeastOne<{
    // Inclusive
    min: number;
    // Exclusive
    max: number;
  }>
>;

export function randomInt(options?: RandomIntOptions): number;

export function randomInt(min: number, max?: number): number;

/**
 * Get a cryptographically secure random integer between `min` (inclusive) and `max` (exclusive).
 *
 * @example
 * ```ts
 * randomInt(1, 10); // a random integer >= 1 and < 10
 * randomInt({ min: 1, max: 10 }); // a random integer >= 1 and < 10
 * ```
 */
export function randomInt(arg1?: number | RandomIntOptions, arg2?: number): number {
  const { min = 0, max = Number.MAX_SAFE_INTEGER } = isObject(arg1) ? arg1 : { min: arg1, max: arg2 };

  assertIsSafeInteger(min, 'min must be a safe integer');
  assertIsSafeInteger(max, 'max must be a safe integer');

  if (min >= max) {
    throw new RangeError('min must be less than max');
  }

  const minBigInt = BigInt(min);
  const range = BigInt(max) - minBigInt;
  const limit = (2n ** 64n / range) * range;
  const data = new BigInt64Array(1);

  let value: bigint;

  do {
    crypto.getRandomValues(data);
    value = BigInt.asUintN(64, data[0]!);
  } while (value >= limit);

  return Number(minBigInt + (value % range));
}
