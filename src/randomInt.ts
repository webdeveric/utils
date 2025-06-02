import { assertIsInteger } from './assertion/assertIsInteger.js';
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

export function randomInt(arg1?: number | RandomIntOptions, arg2?: number): number {
  const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = isObject(arg1)
    ? arg1
    : { min: arg1, max: arg2 };

  assertIsInteger(min, 'min must be an integer');
  assertIsInteger(max, 'max must be an integer');

  if (min === max) {
    return min;
  }

  if (min > max) {
    throw new RangeError('min must be less than max');
  }

  return Math.floor(Math.random() * (max - min)) + min;
}
