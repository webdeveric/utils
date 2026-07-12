import { getError } from './getError.js';

/**
 * Assert that this line is unreachable, useful for exhaustive checks such as a `switch` covering every case of a union.
 *
 * @example
 * ```ts
 * type Direction = 'up' | 'down';
 *
 * function describe(direction: Direction): string {
 *   switch (direction) {
 *     case 'up':
 *       return 'Going up';
 *     case 'down':
 *       return 'Going down';
 *     default:
 *       assertExhaustive(direction); // throws if a new Direction case isn't handled above
 *   }
 * }
 * ```
 */
export function assertExhaustive(_: never, error: string | Error = 'Failed exhaustive check'): never {
  throw getError(error);
}
