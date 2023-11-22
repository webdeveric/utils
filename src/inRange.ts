export const inRange = (input: unknown, min: number | bigint, max: number | bigint): boolean =>
  (typeof input === 'number' || typeof input === 'bigint') && input >= min && input <= max;
