import { describe, expect, it } from 'vitest';

import { bySimpleComparison } from '../../src/sort/bySimpleComparison.js';

describe('bySimpleComparison()', () => {
  it('compares using operators', () => {
    expect([1, 0, 3, 2].sort(bySimpleComparison)).toEqual([0, 1, 2, 3]);

    expect([true, false, true].sort(bySimpleComparison)).toEqual([false, true, true]);

    expect(['c', 'b', 1, 'a', 'x', 'z', 'y', 1].sort(bySimpleComparison)).toEqual(['a', 1, 1, 'b', 'c', 'x', 'y', 'z']);
  });
});
