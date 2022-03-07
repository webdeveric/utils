import { assertsIsFiniteNumber, assertsIsInteger } from '../src/type-assertion';

describe('assertsIsInteger()', () => {
  it('Asserts input is an integer', () => {
    expect(() => assertsIsInteger(1)).not.toThrow();

    [ Infinity, Number.NaN, Math.PI, 'abc', false, null, undefined, [], {} ].forEach(input => {
      expect(() => assertsIsInteger(input)).toThrow();
    });
  });
});

describe('assertsIsFiniteNumber()', () => {
  it('Asserts input is a finite integer', () => {
    [ 1, Math.PI ].forEach(input => {
      expect(() => assertsIsFiniteNumber(input)).not.toThrow();
    });

    [ Infinity, +Infinity, -Infinity, Number.NaN, 'abc', false, null, undefined, [], {} ].forEach(input => {
      expect(() => assertsIsFiniteNumber(input)).toThrow();
    });
  });
});
