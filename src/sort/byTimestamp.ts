import { getMilliseconds } from '../getMilliseconds.js';

/**
 * Compare two dates, strings, or numbers by their timestamp in milliseconds.
 *
 * @example
 * ```ts
 * ['2024-01-02', '2024-01-01'].sort(byTimestamp); // ['2024-01-01', '2024-01-02']
 * ```
 */
export const byTimestamp = <T extends string | number | Date>(left: T, right: T): number => {
  const timeDiff = getMilliseconds(left) - getMilliseconds(right);

  return Number.isNaN(timeDiff) ? -1 : timeDiff;
};
