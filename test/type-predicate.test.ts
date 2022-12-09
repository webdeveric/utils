import {
  isBigInt,
  isBoolean,
  isFiniteNumber,
  isInteger,
  isIntString,
  isLengthAware,
  isNull,
  isNumber,
  isNumericString,
  isNumericValue,
  isNumericValueArray,
  isObject,
  isOptionalBigInt,
  isOptionalBoolean,
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
  isString,
  isStringMatching,
  isStringRecord,
  isStringWithLength,
  isSymbol,
  isUndefined,
} from '../src/type-predicate.js';

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
    ['string', 1, BigInt(1), true, undefined, Symbol(), null].forEach(input => {
      expect(isPrimitive(input)).toBeTruthy();
    });
  });

  it('Returns false for invalid input', () => {
    [['test'], {}, Promise.resolve()].forEach(input => {
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

//

describe('isStringWithLength()', () => {
  it('Returns true for valid input', () => {
    expect(isStringWithLength('test')).toBeTruthy();
    expect(isStringWithLength('')).toBeFalsy();
    expect(isStringWithLength(null)).toBeFalsy();
  });
});

describe('isStringMatching()', () => {
  it('Returns true for valid input', () => {
    expect(isStringMatching('', /^$/)).toBeTruthy();
    expect(isStringMatching('99', /^\d\d$/)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isStringMatching(null, /^null$/)).toBeFalsy();
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
    [0, 1, -1].forEach(input => {
      expect(isInteger(input)).toBeTruthy();
    });
  });

  it('Returns false for invalid inputs', () => {
    [Infinity, Number.NaN, 'bad input', false, null, {}, Math.PI].forEach(input => {
      expect(isInteger(input)).toBeFalsy();
    });
  });
});

describe('isPositiveInteger()', () => {
  it('Returns true for valid inputs', () => {
    [0, -0, 1, 1000].forEach(input => {
      expect(isPositiveInteger(input)).toBeTruthy();
    });
  });

  it('Returns false for invalid inputs', () => {
    [-1000, -Infinity, Number.NaN, 'bad input', false, null, {}].forEach(input => {
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
    [-123, Infinity, Number.NaN, 'bad input', false, null, {}].forEach(input => {
      expect(isPositiveFiniteNumber(input)).toBeFalsy();
    });
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

describe('isObject()', () => {
  it('Returns true for valid inputs', () => {
    expect(isObject({})).toBeTruthy();
  });

  it('Returns false for invalid inputs', () => {
    expect(isObject('test')).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
  });
});

describe('isLengthAware()', () => {
  it('Returns true for valid inputs', () => {
    expect(isLengthAware([])).toBeTruthy();
    expect(isLengthAware({ length: 1 })).toBeTruthy();
  });

  it('Returns false for invalid inputs', () => {
    [-123, Infinity, Number.NaN, 'bad input', false, null, { pi: Math.PI }].forEach(input => {
      expect(isLengthAware(input)).toBeFalsy();
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
    [-123, Infinity, Number.NaN, 'bad input', false, null, { pi: Math.PI }].forEach(input => {
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
