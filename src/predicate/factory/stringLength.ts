import type { TypePredicateFn } from '../../types/functions.js';

export const stringLength = <Type extends string = string>(
  min: number,
  max: number = Number.POSITIVE_INFINITY,
): TypePredicateFn<Type> => {
  if (min < 0) {
    throw new RangeError('min must be greater than or equal to 0');
  }

  if (min > max) {
    throw new RangeError('min cannot be greater than max');
  }

  return (input: unknown): input is Type => typeof input === 'string' && input.length >= min && input.length <= max;
};
