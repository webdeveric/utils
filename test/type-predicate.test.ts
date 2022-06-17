import {
  isFiniteNumber,
  isInteger,
  isIntString,
  isLengthAware,
  isNumericString,
  isNumericValue,
  isNumericValueArray,
  isObject,
  isOptionalNumber,
  isOptionalString,
  isPositiveFiniteNumber,
  isPositiveInteger,
  isPrimitive,
  isPropertyKey,
  isStringMatching,
} from '../src/type-predicate';

describe('isFiniteNumber()', () => {
  it('Returns true for valid input', () => {
    expect(isFiniteNumber(1)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isFiniteNumber(null)).toBeFalsy();
    expect(isFiniteNumber(Infinity)).toBeFalsy();
    expect(isFiniteNumber(Number.NaN)).toBeFalsy();
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

describe('isIntString()', () => {
  it('Returns true for valid inputs', () => {
    ['123', '-123', '+123'].forEach(input => {
      expect(isIntString(input)).toBeTruthy();
    });
  });

  it('Returns false for invalid inputs', () => {
    [Infinity, Number.NaN, 'bad input', false, null, {}, Math.PI].forEach(input => {
      expect(isIntString(input)).toBeFalsy();
    });
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
  it('Returns true for numeric values', () => {
    expect(isNumericValue('12345')).toBeTruthy();
    expect(isNumericValue(Math.PI)).toBeTruthy();
    expect(isNumericValue(123n)).toBeTruthy();
  });

  it('Returns false for non-numeric strings', () => {
    expect(isNumericValue('abc')).toBeFalsy();
  });
});

describe('isNumericValueArray()', () => {
  it('Returns true for numeric strings', () => {
    expect(isNumericValueArray(['123', Math.PI, 123n])).toBeTruthy();
  });

  it('Returns false for non-numeric strings', () => {
    expect(isNumericValueArray(['abc'])).toBeFalsy();
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
    expect(isOptionalNumber(Number.NaN)).toBeFalsy();
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

describe('isStringMatching()', () => {
  it('Returns true for valid input', () => {
    expect(isStringMatching('', /^$/)).toBeTruthy();
    expect(isStringMatching('99', /^\d\d$/)).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isStringMatching(null, /^null$/)).toBeFalsy();
  });
});

describe('isLengthAware()', () => {
  it('Returns true for valid input', () => {
    expect(isLengthAware({ length: 10 })).toBeTruthy();
  });

  it('Returns false for invalid input', () => {
    expect(isLengthAware(null)).toBeFalsy();
    expect(isLengthAware({})).toBeFalsy();
  });
});

describe('isPrimitive()', () => {
  it('Returns true for valid input', () => {
    ['a', 1, 1n, true, undefined, Symbol(), null].forEach(input => {
      expect(isPrimitive(input)).toBeTruthy();
    });
  });

  it('Returns false for invalid input', () => {
    expect(isPrimitive({})).toBeFalsy();
    expect(isPrimitive(new Date())).toBeFalsy();
  });
});

describe('isObject()', () => {
  it('Returns true for valid input', () => {
    [new Date(), {}].forEach(input => {
      expect(isObject(input)).toBeTruthy();
    });
  });

  it('Returns false for invalid input', () => {
    ['a', 1, 1n, true, undefined, Symbol(), null].forEach(input => {
      expect(isObject(input)).toBeFalsy();
    });
  });

  it('Can customize the `is` return type', () => {
    type Demo = {
      demo: true;
    };

    expect(
      isObject<Demo>({
        demo: true,
      }),
    ).toBeTruthy();
  });
});
