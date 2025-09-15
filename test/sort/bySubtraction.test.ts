import { describe, expect, it } from 'vitest';

import { bySubtraction } from '../../src/sort/bySubtraction.js';

describe('bySubtraction()', () => {
  it('compares using subtraction', () => {
    expect([1, 0, 3, 2].sort(bySubtraction)).toEqual([0, 1, 2, 3]);

    expect(['1', 0n, 3, 2].sort(bySubtraction)).toEqual([0n, '1', 2, 3]);
  });
});
