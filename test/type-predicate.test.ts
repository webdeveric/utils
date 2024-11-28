import { describe, it, expect } from 'vitest';

import {
  isAsyncIterable,
  isBigInt,
  isBigIntArray,
  isBoolean,
  isBooleanArray,
  isDigitsString,
  isFiniteNumber,
  isFunction,
  isInteger,
  isIntString,
  isISODateString,
  isIterable,
  isLengthAware,
  isNonNullable,
  isNull,
  isNullArray,
  isNumber,
  isNumberArray,
  isNumericString,
  isNumericValue,
  isNumericValueArray,
  isOptionalBigInt,
  isOptionalBoolean,
  isOptionalISODateString,
  isOptionalNull,
  isOptionalNumber,
  isOptionalString,
  isOptionalSymbol,
  isPositiveFiniteNumber,
  isPositiveInteger,
  isPrimitive,
  isPromiseFulfilledResult,
  isPromiseRejectedResult,
  isPropertyKey,
  isSizeAware,
  isString,
  isStringArray,
  isStringRecord,
  isStringWithLength,
  isSymbol,
  isSymbolArray,
  isUndefined,
  isUndefinedArray,
} from '../src/predicate/index.js';

describe('isString()', () => {
  it('Returns true for valid input', () => {
    expect(isString('test')).toBeTruthy();
    expect(isString(undefined)).toBeFalsy();
  });
});

describe('isNumber()', () => {
  it('Returns true for valid input', () => {
    expect(isNumber(Math.PI)).toBeTruthy();
    expect(isNumber(undefined)).toBeFalsy();
  });
});

describe('isBigInt()', () => {
  it('Returns true for valid input', () => {
    expect(isBigInt(BigInt(1))).toBeTruthy();
    expect(isBigInt(undefined)).toBeFalsy();
  });
});

describe('isBoolean()', () => {
  it('Returns true for valid input', () => {
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean(undefined)).toBeFalsy();
  });
});

describe('isUndefined()', () => {
  it('Returns true for valid input', () => {
    expect(isUndefined(undefined)).toBeTruthy();
    expect(isUndefined(1)).toBeFalsy();
  });
});

describe('isSymbol()', () => {
  it('Returns true for valid input', () => {
    expect(isSymbol(Symbol.for('test'))).toBeTruthy();
    expect(isSymbol(1)).toBeFalsy();
  });
});

describe('isNull()', () => {
  it('Returns true for valid input', () => {
    expect(isNull(null)).toBeTruthy();
    expect(isNull(1)).toBeFalsy();
  });
});

describe('isPrimitive()', () => {
  it('Returns true for valid input', () => {
    ['string', 1, BigInt(1), true, undefined, Symbol(), null].forEach((input) => {
      expect(isPrimitive(input)).toBeTruthy();
    });
  });

  it('Returns false for invalid input', () => {
    [['test'], {}, Promise.resolve()].forEach((input) => {
      expect(isPrimitive(input)).toBeFalsy();
    });
  });
});

describe('isOptionalString()', () => {
  it('Returns true for valid input', () => {
    expect(isOptionalString('test')).toBeTruthy();
    expect(isOptionalString(undefined)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isOptionalString(null)).toBeFalsy();
    expect(isOptionalString(123)).toBeFalsy();
  });
});

describe('isOptionalNumber()', () => {
  it('Returns true for valid input', () => {
    expect(isOptionalNumber(Math.PI)).toBeTruthy();
    expect(isOptionalNumber(undefined)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isOptionalNumber(null)).toBeFalsy();
    expect(isOptionalNumber('test')).toBeFalsy();
  });
});

describe('isOptionalBigInt()', () => {
  it('Returns true for valid input', () => {
    expect(isOptionalBigInt(BigInt(1))).toBeTruthy();
    expect(isOptionalBigInt(undefined)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isOptionalBigInt(null)).toBeFalsy();
    expect(isOptionalBigInt('test')).toBeFalsy();
  });
});

describe('isOptionalBoolean()', () => {
  it('Returns true for valid input', () => {
    expect(isOptionalBoolean(true)).toBeTruthy();
    expect(isOptionalBoolean(undefined)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isOptionalBoolean(null)).toBeFalsy();
    expect(isOptionalBoolean('test')).toBeFalsy();
  });
});

describe('isOptionalISODateString()', () => {
  it('Returns true for valid input', () => {
    expect(isOptionalISODateString(new Date().toISOString())).toBeTruthy();
    expect(isOptionalISODateString(undefined)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isOptionalISODateString(123)).toBeFalsy();
  });
});

describe('isOptionalSymbol()', () => {
  it('Returns true for valid input', () => {
    expect(isOptionalSymbol(Symbol())).toBeTruthy();
    expect(isOptionalSymbol(undefined)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isOptionalSymbol(null)).toBeFalsy();
    expect(isOptionalSymbol('test')).toBeFalsy();
  });
});

describe('isOptionalNull()', () => {
  it('Returns true for valid input', () => {
    expect(isOptionalNull(null)).toBeTruthy();
    expect(isOptionalNull(undefined)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isOptionalNull(true)).toBeFalsy();
    expect(isOptionalNull('test')).toBeFalsy();
  });
});

describe('isStringArray()', () => {
  it('Returns true for valid input', () => {
    expect(isStringArray([])).toBeTruthy();
    expect(isStringArray(['test'])).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isStringArray([1])).toBeFalsy();
  });
});

describe('isNumberArray()', () => {
  it('Returns true for valid input', () => {
    expect(isNumberArray([])).toBeTruthy();
    expect(isNumberArray([Math.PI])).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isNumberArray(['test'])).toBeFalsy();
  });
});

describe('isBigIntArray()', () => {
  it('Returns true for valid input', () => {
    expect(isBigIntArray([])).toBeTruthy();
    expect(isBigIntArray([BigInt(1)])).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isBigIntArray(['test'])).toBeFalsy();
  });
});

describe('isBooleanArray()', () => {
  it('Returns true for valid input', () => {
    expect(isBooleanArray([])).toBeTruthy();
    expect(isBooleanArray([true, false])).toBeTruthy();
  });

  it('Returns true false invalid input', () => {
    expect(isBooleanArray(['test'])).toBeFalsy();
  });
});

describe('isUndefinedArray()', () => {
  it('Returns true for valid input', () => {
    expect(isUndefinedArray([])).toBeTruthy();
    expect(isUndefinedArray([undefined])).toBeTruthy();
  });

  it('Returns true false invalid input', () => {
    expect(isUndefinedArray(['test'])).toBeFalsy();
  });
});

describe('isSymbolArray()', () => {
  it('Returns true for valid input', () => {
    expect(isSymbolArray([])).toBeTruthy();
    expect(isSymbolArray([Symbol('test')])).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isSymbolArray(['test'])).toBeFalsy();
  });
});

describe('isNullArray()', () => {
  it('Returns true for valid input', () => {
    expect(isNullArray([])).toBeTruthy();
    expect(isNullArray([null])).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isNullArray(['test'])).toBeFalsy();
  });
});

describe('isStringWithLength()', () => {
  it('Returns true for valid input', () => {
    expect(isStringWithLength('test')).toBeTruthy();
    expect(isStringWithLength('')).toBeFalsy();
    expect(isStringWithLength(null)).toBeFalsy();
  });
});

describe('isNumericString()', () => {
  it('Returns true for numeric strings', () => {
    expect(isNumericString('12345')).toBeTruthy();
    expect(isNumericString('3.14')).toBeTruthy();
  });

  it('Returns false for non-numeric strings', () => {
    expect(isNumericString('abc')).toBeFalsy();
  });
});

describe('isNumericValue()', () => {
  it('Returns true for numeric strings', () => {
    expect(isNumericValue('12345')).toBeTruthy();
    expect(isNumericValue(Math.PI)).toBeTruthy();
    expect(isNumericValue(BigInt(1))).toBeTruthy();
  });

  it('Returns false for non-numeric strings', () => {
    expect(isNumericValue('abc')).toBeFalsy();
  });
});

describe('isNumericValueArray()', () => {
  it('Returns true for numeric strings', () => {
    expect(isNumericValueArray(['12345', Math.PI, BigInt(1)])).toBeTruthy();
  });

  it('Returns false for non-numeric strings', () => {
    expect(isNumericValueArray('abc')).toBeFalsy();
    expect(isNumericValueArray(['xyz'])).toBeFalsy();
  });
});

describe('isIntString()', () => {
  it('Returns true for valid input', () => {
    expect(isIntString('12345')).toBeTruthy();
    expect(isIntString('-12345')).toBeTruthy();
    expect(isIntString('+12345')).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isIntString('3.14')).toBeFalsy();
    expect(isIntString(['xyz'])).toBeFalsy();
  });
});

describe('isISODateString()', () => {
  it('Returns boolean indicating input is an ISODateString', () => {
    expect(isISODateString(new Date(0).toISOString())).toBeTruthy();
    expect(isISODateString(new Date('+9999-12-31').toISOString())).toBeTruthy();
    expect(isISODateString(false)).toBeFalsy();
    expect(isISODateString(null)).toBeFalsy();
  });
});

describe('isDigitsString()', () => {
  it('Returns true for valid input', () => {
    expect(isDigitsString('12345')).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isDigitsString('3.14')).toBeFalsy();
    expect(isDigitsString('-12345')).toBeFalsy();
    expect(isDigitsString('+12345')).toBeFalsy();
    expect(isDigitsString(['xyz'])).toBeFalsy();
  });
});

describe('isFiniteNumber()', () => {
  it('Returns true for valid input', () => {
    expect(isFiniteNumber(123)).toBeTruthy();
    expect(isFiniteNumber(123.456)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isFiniteNumber(Number.NaN)).toBeFalsy();
    expect(isFiniteNumber(Infinity)).toBeFalsy();
  });
});

describe('isInteger()', () => {
  it('Returns true for valid inputs', () => {
    [0, 1, -1].forEach((input) => {
      expect(isInteger(input)).toBeTruthy();
    });
  });

  it('Returns false for invalid inputs', () => {
    [Infinity, Number.NaN, 'bad input', false, null, {}, Math.PI].forEach((input) => {
      expect(isInteger(input)).toBeFalsy();
    });
  });
});

describe('isPositiveInteger()', () => {
  it('Returns true for valid inputs', () => {
    [0, -0, 1, 1000].forEach((input) => {
      expect(isPositiveInteger(input)).toBeTruthy();
    });
  });

  it('Returns false for invalid inputs', () => {
    [-1000, -Infinity, Number.NaN, 'bad input', false, null, {}].forEach((input) => {
      expect(isPositiveInteger(input)).toBeFalsy();
    });
  });
});

describe('isPositiveFiniteNumber()', () => {
  it('Returns true for valid inputs', () => {
    expect(isPositiveFiniteNumber(0)).toBeTruthy();
    expect(isPositiveFiniteNumber(123456)).toBeTruthy();
  });

  it('Returns false for invalid inputs', () => {
    [-123, Infinity, Number.NaN, 'bad input', false, null, {}].forEach((input) => {
      expect(isPositiveFiniteNumber(input)).toBeFalsy();
    });
  });
});

describe('isNonNullable()', () => {
  it('Returns true for valid input', () => {
    expect(isNonNullable('string-key')).toBeTruthy();
    expect(isNonNullable(123)).toBeTruthy();
    expect(isNonNullable(Symbol('symbol-key'))).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isNonNullable(null)).toBeFalsy();
    expect(isNonNullable(undefined)).toBeFalsy();
  });

  it('Can be used with Array.filter()', () => {
    expect([1, null, 2, undefined, 3].filter(isNonNullable)).toEqual([1, 2, 3]);
  });
});

describe('isPropertyKey()', () => {
  it('Returns true for valid input', () => {
    expect(isPropertyKey('string-key')).toBeTruthy();
    expect(isPropertyKey(123)).toBeTruthy();
    expect(isPropertyKey(Symbol('symbol-key'))).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isPropertyKey(false)).toBeFalsy();
    expect(isPropertyKey(null)).toBeFalsy();
    expect(isPropertyKey(undefined)).toBeFalsy();
    expect(isPropertyKey({})).toBeFalsy();
  });
});

describe('isFunction()', () => {
  it('Returns true for valid input', () => {
    expect(isFunction(() => {})).toBeTruthy();
    expect(isFunction(function () {})).toBeTruthy();
    expect(isFunction(Object.values)).toBeTruthy();
    expect(isFunction(null)).toBeFalsy();
  });
});

describe('isIterable()', () => {
  it('Returns true for valid input', () => {
    expect(
      isIterable({
        *[Symbol.iterator]() {
          yield 1;
        },
      }),
    ).toBeTruthy();
  });
});

describe('isAsyncIterable()', () => {
  it('Returns true for valid input', () => {
    expect(
      isAsyncIterable({
        async *[Symbol.asyncIterator]() {
          await 1;
          yield 1;
        },
      }),
    ).toBeTruthy();
  });
});

describe('isLengthAware()', () => {
  it('Returns true for valid inputs', () => {
    expect(isLengthAware([])).toBeTruthy();
    expect(isLengthAware({ length: 1 })).toBeTruthy();
  });

  it('Returns false for invalid inputs', () => {
    [-123, Infinity, Number.NaN, 'bad input', false, null, { pi: Math.PI }].forEach((input) => {
      expect(isLengthAware(input)).toBeFalsy();
    });
  });
});

describe('isSizeAware()', () => {
  it('Returns true for valid inputs', () => {
    expect(isSizeAware(new Set())).toBeTruthy();
    expect(isSizeAware({ size: 1 })).toBeTruthy();
  });

  it('Returns false for invalid inputs', () => {
    [-123, Infinity, Number.NaN, 'bad input', false, null, { pi: Math.PI }].forEach((input) => {
      expect(isSizeAware(input)).toBeFalsy();
    });
  });
});

describe('isStringRecord()', () => {
  it('Returns true for valid inputs', () => {
    expect(
      isStringRecord({
        test: 'true',
        enabled: 'false',
      }),
    ).toBeTruthy();
  });

  it('Returns false for invalid inputs', () => {
    [-123, Infinity, Number.NaN, 'bad input', false, null, { pi: Math.PI }].forEach((input) => {
      expect(isStringRecord(input)).toBeFalsy();
    });
  });
});

describe('isPromiseFulfilledResult()', () => {
  it('Returns true for valid inputs', async () => {
    const result = await Promise.allSettled([Promise.resolve(), Promise.reject(new Error('test'))]);

    expect(isPromiseFulfilledResult(result[0])).toBeTruthy();
    expect(isPromiseFulfilledResult(result[1])).toBeFalsy();
  });
});

describe('isPromiseRejectedResult()', () => {
  it('Returns true for valid inputs', async () => {
    const result = await Promise.allSettled([Promise.resolve(), Promise.reject(new Error('test'))]);

    expect(isPromiseRejectedResult(result[0])).toBeFalsy();
    expect(isPromiseRejectedResult(result[1])).toBeTruthy();
  });
});
