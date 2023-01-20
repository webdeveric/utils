import { describe, expect, it } from 'vitest';

import { byTimestamp, byLocaleCompare, bySimpleComparison, bySubtraction } from '../src/sort.js';

describe('byLocaleCompare()', () => {
  it('compares by string localeCompare', () => {
    expect(['c', 'b', 'a'].sort(byLocaleCompare)).toEqual(['a', 'b', 'c']);
  });
});

describe('byTimestamp()', () => {
  it('sorts by timestamp', () => {
    const now = new Date();
    const past = new Date();

    past.setDate(past.getDate() - 10);

    const data = [now, 0, past, now.toISOString(), past.toISOString(), 1];

    expect(data.sort(byTimestamp)).toEqual([0, 1, past, past.toISOString(), now, now.toISOString()]);
  });

  it('Handles bad dates', () => {
    const now = new Date();
    const bad = Date.parse('not a date');

    const data = [now, bad];

    expect(data.sort(byTimestamp)).toEqual([bad, now]);
  });
});

describe('bySimpleComparison()', () => {
  it('compares using operators', () => {
    expect([1, 0, 3, 2].sort(bySimpleComparison)).toEqual([0, 1, 2, 3]);

    expect([true, false, true].sort(bySimpleComparison)).toEqual([false, true, true]);

    expect(['c', 'b', 1, 'a', 'x', 'z', 'y', 1].sort(bySimpleComparison)).toEqual(['a', 1, 1, 'b', 'c', 'x', 'y', 'z']);
  });
});

describe('bySubtraction()', () => {
  it('compares using subtraction', () => {
    expect([1, 0, 3, 2].sort(bySubtraction)).toEqual([0, 1, 2, 3]);

    expect(['1', 0n, 3, 2].sort(bySubtraction)).toEqual([0n, '1', 2, 3]);
  });
});
