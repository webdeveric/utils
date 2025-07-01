import { describe, it, expect } from 'vitest';

import { isObjectLiteral } from '../../src/predicate/isObjectLiteral.js';

describe('isObjectLiteral()', () => {
  it('Returns true for valid input', () => {
    expect(
      isObjectLiteral({
        test: true,
      }),
    ).toBeTruthy();
  });

  it.each([Object.create(null), new Date(), globalThis, 1, 'a', true, null, undefined])(
    'Returns false for invalid input: %j',
    (input) => {
      expect(isObjectLiteral(input)).toBeFalsy();
    },
  );
});
