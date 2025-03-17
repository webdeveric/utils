import type { TypePredicateFn } from '../../types/functions.js';

export const range = <Type extends number | bigint>(min: Type, max: Type): TypePredicateFn<Type> => {
  if (min === Number.NEGATIVE_INFINITY && max === Number.POSITIVE_INFINITY) {
    throw new RangeError('min and max cannot be -Infinity and Infinity');
  }

  if (Number.isNaN(min) || Number.isNaN(max)) {
    throw new RangeError('min and max must not be NaN');
  }

  if (min >= max) {
    throw new RangeError('min must be less than max');
  }

  return (input: unknown): input is Type =>
    (typeof input === 'number' || typeof input === 'bigint') && input >= min && input <= max;
};
