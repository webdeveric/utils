import { countCharCode } from './countCharCode.js';

export function countCharacter(input: string, char: string): number {
  if (char.length !== 1) {
    throw new Error('Expected a single character');
  }

  return countCharCode(input, char.charCodeAt(0));
}
