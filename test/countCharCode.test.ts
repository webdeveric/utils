import { describe, expect, it } from 'vitest';

import { countCharCode } from '../src/countCharCode.js';

describe('countCharCode()', () => {
  it('should count the number of occurrences of a specific character code', () => {
    expect(countCharCode('Hello, World!', 108)).toBe(3);

    expect(countCharCode('How are you today?', 42)).toBe(0);
  });
});
