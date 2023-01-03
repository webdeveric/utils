import { describe, it, expect } from 'vitest';

import { getOwnKeys } from '../src/getOwnKeys';

import type { AnyRecord } from '../src/types';

describe('getOwnKeys()', () => {
  it('Returns an array of object keys', () => {
    const data = {
      name: 'Test',
      0: 'zero',
    };

    expect(getOwnKeys(data)).toEqual(expect.arrayContaining(['name', '0']));

    expect(getOwnKeys(['one', 'two'])).toEqual(expect.arrayContaining(['0', '1']));
  });

  it('Throws when not given an object or array', () => {
    expect(() => {
      getOwnKeys(null as unknown as AnyRecord);
    }).toThrow();
  });
});
