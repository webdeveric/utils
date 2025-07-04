import { describe, expect, it } from 'vitest';

import { hasAdditionalProperties } from '../src/hasAdditionalProperties.js';

describe('hasAdditionalProperties()', () => {
  it('returns true when additional properties are detected', () => {
    expect(hasAdditionalProperties({ a: 1, b: 2 }, ['a'])).toBeTruthy();
  });

  it('returns false when additional properties are not detected', () => {
    expect(hasAdditionalProperties({ a: 1, [Symbol.for('b')]: 2 }, ['a', Symbol.for('b')])).toBeFalsy();
  });

  it('automatically allows `length` when the input is an array', () => {
    expect(hasAdditionalProperties([0, 1], [0])).toBeTruthy();
    expect(hasAdditionalProperties([0, 1], [0, 'length'])).toBeTruthy();

    expect(hasAdditionalProperties([0, 1], [0, 1])).toBeFalsy();
    expect(hasAdditionalProperties([0, 1], [0, 1, 'length'])).toBeFalsy();
  });
});
