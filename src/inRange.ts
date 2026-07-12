/**
 * Determine if `input` is a number or bigint between `min` and `max`, inclusive.
 *
 * @example
 * ```ts
 * inRange(5, 1, 10); // true
 * inRange(15, 1, 10); // false
 * ```
 */
export const inRange = (input: unknown, min: number | bigint, max: number | bigint): boolean =>
  (typeof input === 'number' || typeof input === 'bigint') && input >= min && input <= max;
