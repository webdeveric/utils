import { getMilliseconds } from '../getMilliseconds.js';

export const byTimestamp = <T extends string | number | Date>(left: T, right: T): number => {
  const timeDiff = getMilliseconds(left) - getMilliseconds(right);

  return Number.isNaN(timeDiff) ? -1 : timeDiff;
};
