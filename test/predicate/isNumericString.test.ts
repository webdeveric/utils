import { describe, it, expect } from 'vitest';

import { isNumericString } from '../../src/predicate/isNumericString.js';

describe('isNumericString()', () => {
  it.each(['1', '2.3', '-4', '+5.67', '.89', '-0', '+0'])('Returns true for valid input: %s', (input) => {
    expect(isNumericString(input)).toBeTruthy();
  });

  it.each(['', 'not numeric', Symbol('test'), null, undefined, Number.MAX_SAFE_INTEGER])(
    'Returns false for invalid input: %s',
    (input) => {
      expect(isNumericString(input)).toBeFalsy();
    },
  );

  it('Can be used with Array.filter()', () => {
    expect(['1', null, 2, undefined, '3.14'].filter(isNumericString)).toEqual(['1', '3.14']);
  });
});
