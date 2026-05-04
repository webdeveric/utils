import { describe, expect, it } from 'vitest';

import { countCharacter } from '../src/countCharacter.js';

describe('countCharacter()', () => {
  it('should count the number of occurrences of a specific character', () => {
    expect(countCharacter('Hello, World!', 'l')).toBe(3);

    expect(countCharacter('How are you today?', '*')).toBe(0);
  });

  it('should throw if the input is not a single character', () => {
    expect(() => countCharacter('Hello, World!', 'll')).toThrow();
    expect(() => countCharacter('Some string', '')).toThrow();
  });
});
