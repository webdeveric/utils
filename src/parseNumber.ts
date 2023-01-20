import { isBigInt, isNumber } from './type-predicate.js';

export const parseNumber = (input: bigint | number | string): number =>
  isNumber(input) ? input : isBigInt(input) ? Number.parseInt(input.toString()) : Number.parseFloat(input);
