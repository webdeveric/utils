import { describe, it, expect } from 'vitest';

import { isISODateString } from '../../src/predicate/isISODateString.js';

describe('isISODateString()', () => {
  it.each([new Date(0).toISOString(), new Date('+9999-12-31').toISOString(), '2025-08-01T01:23:34.123456789Z'])(
    'Returns true for valid input: "%s"',
    (input) => {
      expect(isISODateString(input)).toBeTruthy();
    },
  );

  it.each(['9999-12-31T06:00:00', null, false, ''])('Returns false for invalid input: "%s"', (input) => {
    expect(isISODateString(input)).toBeFalsy();
  });
});
