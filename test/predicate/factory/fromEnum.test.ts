import { describe, it, expect } from 'vitest';

import { fromEnum } from '../../../src/predicate/factory/fromEnum.js';

describe('fromEnum()', () => {
  describe('enum with string values', () => {
    enum StringEnum {
      A = 'a',
      B = 'b',
      C = 'c',
    }

    const fn = fromEnum(StringEnum);

    it.each(Object.values(StringEnum))('Returns true for valid input: %s', (value) => {
      expect(fn(value)).toBeTruthy();
    });

    it.each(Object.keys(StringEnum))('Returns false for invalid input: %s', (value) => {
      expect(fn(value)).toBeFalsy();
    });
  });

  describe('enum with number values', () => {
    enum Demo {
      Example = 'Example',
      One = 1,
      Two = 2,
      Pi = Math.PI,
      NegativeInfinity = Number.NEGATIVE_INFINITY,
      PositiveInfinity = Number.POSITIVE_INFINITY,
      NotANumber = Number.NaN,
    }

    const fn = fromEnum(Demo);

    it('Returns a type predicate function', () => {
      expect(fn).toBeInstanceOf(Function);
    });

    it.each([Demo.Example, Demo.One, Demo.Two, Demo.Pi, Demo.NegativeInfinity, Demo.PositiveInfinity, Demo.NotANumber])(
      'Returns true for valid input: %s',
      (value) => {
        expect(fn(value)).toBeTruthy();
      },
    );

    it.each([1, 2, Math.PI, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NaN].map(String))(
      'Returns false for invalid input: "%s"',
      (value) => {
        expect(fn(value)).toBeFalsy();
      },
    );
  });
});
