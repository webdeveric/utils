import { countCharCode } from './countCharCode.js';

/**
 * Count how many times `char` occurs in `input`.
 *
 * @example
 * ```ts
 * countCharacter('hello', 'l'); // 2
 * ```
 */
export function countCharacter(input: string, char: string): number {
  if (char.length !== 1) {
    throw new Error('Expected a single character');
  }

  return countCharCode(input, char.charCodeAt(0));
}
