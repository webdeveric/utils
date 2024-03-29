import { describe, it, expect } from 'vitest';

import { getOwnProperties } from '../src/getOwnProperties.js';

import type { AnyRecord } from '../src/types/records.js';

describe('getOwnProperties()', () => {
  it('Returns an array of object keys', () => {
    const details = Symbol.for('details');

    const data = {
      name: 'Test',
      0: 'zero',
      [details]: {},
    };

    expect(getOwnProperties(data)).toEqual(expect.arrayContaining(['name', '0', details]));

    expect(getOwnProperties(['one', 'two'])).toEqual(expect.arrayContaining(['0', '1', 'length']));
  });

  it('Throws when not given an object or array', () => {
    expect(() => {
      getOwnProperties(null as unknown as AnyRecord);
    }).toThrow();
  });
});
