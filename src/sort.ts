import { getMilliseconds } from './getMilliseconds.js';
import { parseNumber } from './parseNumber.js';

export const byLocaleCompare = (left: string, right: string): number => left.localeCompare(right);

export const byTimestamp = <T extends string | number | Date>(left: T, right: T): number => {
  const timeDiff = getMilliseconds(left) - getMilliseconds(right);

  return Number.isNaN(timeDiff) ? -1 : timeDiff;
};

export const bySimpleComparison = <T>(left: T, right: T): number => {
  return left === right ? 0 : left > right ? 1 : -1;
};

export const bySubtraction = <T extends number | bigint | string>(left: T, right: T): number =>
  parseNumber(left) - parseNumber(right);
