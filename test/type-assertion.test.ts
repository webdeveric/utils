import {
  assertIsFiniteNumber, assertIsInteger, assertIsNumericValueArray,
} from '../src/type-assertion';

describe('assertIsInteger()', () => {
  it('Asserts input is an integer', () => {
    expect(() => assertIsInteger(1)).not.toThrow();

    [ Infinity, Number.NaN, Math.PI, 'abc', false, null, undefined, [], {} ].forEach(input => {
      expect(() => assertIsInteger(input)).toThrow();
    });
  });
});

describe('assertIsFiniteNumber()', () => {
  it('Asserts input is a finite integer', () => {
    [ 1, Math.PI ].forEach(input => {
      expect(() => assertIsFiniteNumber(input)).not.toThrow();
    });

    [ Infinity, +Infinity, -Infinity, Number.NaN, 'abc', false, null, undefined, [], {} ].forEach(input => {
      expect(() => assertIsFiniteNumber(input)).toThrow();
    });
  });
});

describe('assertIsNumericValueArray()', () => {
  it('Asserts input is a NumericValue[]', () => {
    expect(() => assertIsNumericValueArray([ 1, 1n, '1' ])).not.toThrow();
    expect(() => assertIsNumericValueArray([ false, {}, null ])).toThrow();
  });
});

