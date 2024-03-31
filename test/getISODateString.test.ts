import { describe, it, expect } from 'vitest';

import { getISODateString } from '../src/getISODateString.js';

describe('getISODateString()', () => {
  it('Returns an ISODateString', () => {
    const now = new Date();

    expect(getISODateString(now)).toEqual(now.toISOString());
    expect(getISODateString(now.getTime())).toEqual(now.toISOString());
    expect(getISODateString(now.toISOString())).toEqual(now.toISOString());
    expect(getISODateString()).toEqual(expect.any(String));
    expect(getISODateString(undefined)).toEqual(expect.any(String));
  });

  it('Throws when given bad input', () => {
    expect(() => {
      getISODateString('bad input');
    }).toThrow();

    expect(() => {
      getISODateString(Number.NaN);
    }).toThrow();
  });
});
