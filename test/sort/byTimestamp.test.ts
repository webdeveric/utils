import { describe, expect, it } from 'vitest';

import { byTimestamp } from '../../src/sort/byTimestamp.js';

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
