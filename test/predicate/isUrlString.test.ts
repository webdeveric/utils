import { describe, it, expect } from 'vitest';

import { isUrlString } from '../../src/predicate/isUrlString.js';

describe('isUrlString()', () => {
  it.each(['http://example.com', 'https://example.com'])('Returns true for valid input: %j', (input) => {
    expect(isUrlString(input)).toBeTruthy();
  });

  it.each([1, 'a', true, null, {}, undefined])('Returns false for invalid input: %j', (input) => {
    expect(isUrlString(input)).toBeFalsy();
  });
});
