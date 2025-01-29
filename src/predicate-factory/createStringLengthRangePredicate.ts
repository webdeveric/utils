import type { TypePredicateFn } from '../types/functions.js';

export const createStringLengthRangePredicate = (
  min: number,
  max: number = Number.POSITIVE_INFINITY,
): TypePredicateFn<string> => {
  if (min < 0) {
    throw new RangeError('min must be >= 0');
  }

  return (input: unknown): input is string => typeof input === 'string' && input.length >= min && input.length <= max;
};
