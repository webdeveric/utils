import { isBigInt } from './predicate/isBigInt.js';
import { isNumber } from './predicate/isNumber.js';

export const parseNumber = (input: bigint | number | string): number =>
  isNumber(input) ? input : isBigInt(input) ? Number.parseInt(input.toString()) : Number.parseFloat(input);
