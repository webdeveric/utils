import { isInteger } from './type-predicate.js';

export const byLocaleCompare = (left: string, right: string): number => left.localeCompare(right);

const getMilliseconds = (input: string | number | Date): number =>
  input instanceof Date ? input.getTime() : isInteger(input) ? input : Date.parse(input);

export const byTimestamp = <T extends string | number | Date>(left: T, right: T): number => {
  const timeDiff = getMilliseconds(left) - getMilliseconds(right);

  return Number.isNaN(timeDiff) ? -1 : timeDiff;
};

export const bySimpleComparison = <T>(left: T, right: T): number => {
  return left === right ? 0 : left > right ? 1 : -1;
};
