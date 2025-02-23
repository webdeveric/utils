import { assertIsNumber } from '../assertion/assertIsNumber.js';
import { isNumber } from '../predicate/isNumber.js';

import type { TypePredicateFn } from '../types/functions.js';

export const createNumberRangePredicate = <Type extends number = number>(
  min: number,
  max: number = Number.POSITIVE_INFINITY,
): TypePredicateFn<Type> => {
  assertIsNumber(min, 'min is not a number');
  assertIsNumber(max, 'max is not a number');

  if (min === Number.NEGATIVE_INFINITY && max === Number.POSITIVE_INFINITY) {
    throw new RangeError('min and max cannot be -Infinity and Infinity');
  }

  if (min > max) {
    throw new RangeError('min cannot be greater than max');
  }

  if (min === max) {
    throw new RangeError('min and max cannot be the same');
  }

  return (input: unknown): input is Type => isNumber(input) && input >= min && input <= max;
};
