import { describe, it, expect } from 'vitest';

import { asArray } from '../src/asArray';

describe('asArray()', () => {
  it('Returns an array when given an array', () => {
    const data = [true];

    expect(asArray(data)).toBe(data);
  });

  it('Returns an array when not given an array', () => {
    const data = true;

    expect(asArray(data)).toStrictEqual([data]);
  });
});
