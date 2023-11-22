import { describe, it, expect } from 'vitest';

import { getDateString } from '../src/getDateString.js';

describe('getDateString()', () => {
  it('Returns a DateString', () => {
    const now = new Date();

    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    expect(getDateString(now)).toEqual(today);
    expect(getDateString(now.getTime())).toEqual(today);
    expect(getDateString(now.toISOString())).toEqual(today);
    expect(getDateString()).toEqual(today);
    expect(getDateString(undefined)).toEqual(today);
  });

  it('Throws when given bad input', () => {
    expect(() => {
      getDateString('bad input');
    }).toThrow();
  });
});
