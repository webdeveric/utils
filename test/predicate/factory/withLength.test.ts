import { describe, it, expect } from 'vitest';

import { withLength } from '../../../src/predicate/factory/withLength.js';
import { isString } from '../../../src/predicate/isString.js';

describe('withLength()', () => {
  const twoCharString = withLength(isString, 2);
  const stringRange = withLength(isString, [1, 3]);

  it('Returns a type predicate function', () => {
    expect(twoCharString).toBeInstanceOf(Function);
    expect(stringRange).toBeInstanceOf(Function);
  });

  it('Throws when given an invalid range', () => {
    expect(() => {
      withLength(isString, [100, 1]);
    }).toThrowError();
  });

  it('Returns true for strings with the specified length', () => {
    expect(twoCharString('ab')).toBeTruthy();
  });

  it.each(['a', 'ab', 'abc'])('Returns true for strings within the specified length range: %s', (input) => {
    expect(stringRange(input)).toBeTruthy();
  });

  it.each(['a', 'abc', true, null, 123])('Returns false for inputs with wrong lengths: %s', (input) => {
    expect(twoCharString(input)).toBeFalsy();
  });

  it.each(['', 'abcd', true, null, 123])('Returns false for inputs outside the specified range: %s', (input) => {
    expect(twoCharString(input)).toBeFalsy();
  });
});
