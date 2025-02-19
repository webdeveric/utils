import type { TypePredicateFn } from '../types/functions.js';

export const createStringLengthRangePredicate = <Type extends string = string>(
  min: number,
  max: number = Number.POSITIVE_INFINITY,
): TypePredicateFn<Type> => {
  if (min < 0) {
    throw new RangeError('min must be >= 0');
  }

  return (input: unknown): input is Type => typeof input === 'string' && input.length >= min && input.length <= max;
};
