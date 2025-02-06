import { describe, it, expect } from 'vitest';

import { assertIsInt32 } from '../../src/assertion/assertIsInt32.js';

describe('assertIsInt32()', () => {
  it.each([null, undefined, 'not a number', Number.NaN, Infinity, Math.PI, Number.MAX_SAFE_INTEGER])(
    'Throws when input is invalid: %s',
    (input) => {
      expect(() => {
        assertIsInt32(input);
      }).toThrowError();
    },
  );

  it.each([-1, 0, 1, -2_147_483_648, 2_147_483_647])('Does not throw when input is valid: %s', (input) => {
    expect(() => {
      assertIsInt32(input);
    }).not.toThrowError();
  });
});
