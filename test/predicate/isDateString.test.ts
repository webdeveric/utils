import { describe, it, expect } from 'vitest';

import { isDateString } from '../../src/predicate/isDateString.js';

describe('isDateString()', () => {
  it.each([
    new Date().toISOString(),
    new Date().toLocaleDateString('en-US'),
    new Date().toLocaleString(),
    new Date().toUTCString(),
    new Date().toString(),
  ])('Returns true for valid input: %j', (input) => {
    expect(isDateString(input)).toBeTruthy();
  });

  it.each([Date.now(), 'bad input', true, null, {}, undefined])('Returns false for invalid input: %j', (input) => {
    expect(isDateString(input)).toBeFalsy();
  });
});
