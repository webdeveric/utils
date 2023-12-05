import { describe, it, expect } from 'vitest';

import { getDateString } from '../src/getDateString.js';

describe('getDateString()', () => {
  it('Returns a DateString', () => {
    const pastDate = new Date('2020-01-25T00:00:00.589Z');

    const yyyymmdd = '2020-01-25';

    expect(getDateString(pastDate)).toEqual(yyyymmdd);
    expect(getDateString(pastDate.getTime())).toEqual(yyyymmdd);
    expect(getDateString(pastDate.toISOString())).toEqual(yyyymmdd);
    expect(getDateString()).toEqual(new Date().toISOString().split('T').at(0));
    expect(getDateString(undefined)).toEqual(new Date().toISOString().split('T').at(0));
  });

  it('Throws when given bad input', () => {
    expect(() => {
      getDateString('bad input');
    }).toThrow();
  });
});
