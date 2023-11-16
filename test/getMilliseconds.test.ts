import { describe, it, expect } from 'vitest';

import { getMilliseconds } from '../src/getMilliseconds.js';

describe('getMilliseconds()', () => {
  it('Returns milliseconds', () => {
    const now = new Date();

    expect(getMilliseconds(now)).toEqual(now.getTime());
    expect(getMilliseconds(now.toISOString())).toEqual(now.getTime());
    expect(getMilliseconds(now.getTime())).toEqual(now.getTime());
  });
});
