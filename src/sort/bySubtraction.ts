import { parseNumber } from '../parseNumber.js';

export const bySubtraction = <T extends number | bigint | string>(left: T, right: T): number =>
  parseNumber(left) - parseNumber(right);
