import { describe, it, expect } from 'vitest';

import { isFiniteNumber, isString } from '../../src/index.js';
import { createIsTuplePredicate } from '../../src/predicate-factory/createIsTuplePredicate.js';

describe('createIsTuplePredicate()', () => {
  it('Returns a type predicate function', () => {
    expect(createIsTuplePredicate([])).toBeInstanceOf(Function);
  });

  describe('Can define the tuple shape', () => {
    it('Empty tuple shape returns true', () => {
      const fn = createIsTuplePredicate([]);

      expect(fn([])).toBeTruthy();
    });

    it('Can be made up of primitives', () => {
      const fn = createIsTuplePredicate([null, 'test', true, Math.PI, undefined]);

      expect(fn([null, 'test', true, Math.PI, undefined])).toBeTruthy();
      expect(fn('Fail')).toBeFalsy();
    });

    it('Can be made up of type predicate functions', () => {
      const fn = createIsTuplePredicate([isString, isFiniteNumber]);

      expect(fn(['test', 123])).toBeTruthy();
      expect(fn([null])).toBeFalsy();
    });

    it('Can use a mix of primitives and type predicate functions', () => {
      const fn = createIsTuplePredicate([isString, null, false, 'test']);

      expect(fn(['some string', null, false, 'test'])).toBeTruthy();
      expect(fn([true, null, false, 'test'])).toBeFalsy();
    });
  });
});
