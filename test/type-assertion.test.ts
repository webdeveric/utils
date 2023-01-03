import { describe, it, expect } from 'vitest';

import {
  assertExhaustive,
  assertIsBigInt,
  assertIsBigIntArray,
  assertIsBoolean,
  assertIsBooleanArray,
  assertIsDigitsString,
  assertIsFiniteNumber,
  assertIsInteger,
  assertIsIntString,
  assertIsLengthAware,
  assertIsNull,
  assertIsNullArray,
  assertIsNumber,
  assertIsNumberArray,
  assertIsNumberGTEOne,
  assertIsNumericString,
  assertIsNumericValue,
  assertIsNumericValueArray,
  assertIsObject,
  assertIsOptionalBigInt,
  assertIsOptionalBoolean,
  assertIsOptionalNull,
  assertIsOptionalNumber,
  assertIsOptionalString,
  assertIsOptionalSymbol,
  assertIsPositiveFiniteNumber,
  assertIsPositiveInteger,
  assertIsPrimitive,
  assertIsPromiseFulfilledResult,
  assertIsPromiseRejectedResult,
  assertIsPropertyKey,
  assertIsSizeAware,
  assertIsString,
  assertIsStringArray,
  assertIsStringMatching,
  assertIsStringRecord,
  assertIsStringWithLength,
  assertIsSymbol,
  assertIsSymbolArray,
  assertIsUndefined,
  assertIsUndefinedArray,
} from '../src/type-assertion.js';

describe('assertIsBigInt()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsBigInt(1);
    }).toThrow();

    expect(() => {
      assertIsBigInt(BigInt(1));
    }).not.toThrow();
  });

  it('Can provide a custom Error', () => {
    const error = new Error('testing');

    expect(() => {
      assertIsBigInt(1, error);
    }).toThrow(error);
  });
});

describe('assertIsBoolean()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsBoolean('test');
    }).toThrow();

    expect(() => {
      assertIsBoolean(true);
    }).not.toThrow();
  });
});

describe('assertIsFiniteNumber()', () => {
  it('Throws when input is invalid', () => {
    ['not a number', Number.NaN, Infinity, -Infinity].forEach(input => {
      expect(() => {
        assertIsFiniteNumber(input);
      }).toThrow();
    });

    [0, -1, 2, 3.14].forEach(input => {
      expect(() => {
        assertIsFiniteNumber(input);
      }).not.toThrow();
    });
  });
});

describe('assertIsInteger()', () => {
  it('Throws when input is invalid', () => {
    ['not a number', Number.NaN, Infinity, Math.PI].forEach(input => {
      expect(() => {
        assertIsInteger(input);
      }).toThrow();
    });

    [0, -1, 2].forEach(input => {
      expect(() => {
        assertIsInteger(input);
      }).not.toThrow();
    });
  });
});

describe('assertIsIntString()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsIntString('abc123');
    }).toThrow();

    expect(() => {
      assertIsIntString('123456');
    }).not.toThrow();
  });
});

describe('assertIsDigitsString()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsDigitsString('123456');
    }).not.toThrow();

    [123, '-123', '+123', '123.456'].forEach(input => {
      expect(() => {
        assertIsDigitsString(input);
      }).toThrow();
    });
  });
});

describe('assertIsLengthAware()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsLengthAware(false);
    }).toThrow();

    expect(() => {
      assertIsLengthAware([]);
    }).not.toThrow();
  });
});

describe('assertIsSizeAware()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsSizeAware(false);
    }).toThrow();

    expect(() => {
      assertIsSizeAware(new Set());
    }).not.toThrow();
  });
});

describe('assertIsNull()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsNull(false);
    }).toThrow();

    expect(() => {
      assertIsNull(null);
    }).not.toThrow();
  });
});

describe('assertIsNumber()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsNumber('abc');
    }).toThrow();

    expect(() => {
      assertIsNumber(Number.NaN);
    }).toThrow();

    expect(() => {
      assertIsNumber(1);
    }).not.toThrow();
  });
});

describe('assertIsNumericString()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsNumericString('abc123');
    }).toThrow();

    ['1234', '-123', '+123', '123.456'].forEach(input => {
      expect(() => {
        assertIsNumericString(input);
      }).not.toThrow();
    });
  });
});

describe('assertIsNumericValue()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsNumericValue(false);
    }).toThrow();

    expect(() => {
      assertIsNumericValue('123');
    }).not.toThrow();
  });
});

describe('assertIsNumericValueArray()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsNumericValueArray(['abc']);
    }).toThrow();

    expect(() => {
      assertIsNumericValueArray([1, '2', BigInt(3)]);
    }).not.toThrow();
  });
});

describe('assertIsObject()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsObject(null);
    }).toThrow();

    expect(() => {
      assertIsObject({});
    }).not.toThrow();
  });
});

describe('assertIsOptionalBigInt()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsOptionalBigInt(false);
    }).toThrow();

    expect(() => {
      assertIsOptionalBigInt(BigInt(1));
      assertIsOptionalBigInt(undefined);
    }).not.toThrow();
  });
});

describe('assertIsOptionalBoolean()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsOptionalBoolean('test');
    }).toThrow();

    expect(() => {
      assertIsOptionalBoolean(true);
      assertIsOptionalBoolean(undefined);
    }).not.toThrow();
  });
});

describe('assertIsOptionalNull()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsOptionalNull(false);
    }).toThrow();

    expect(() => {
      assertIsOptionalNull(null);
      assertIsOptionalNull(undefined);
    }).not.toThrow();
  });
});

describe('assertIsOptionalNumber()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsOptionalNumber('test');
    }).toThrow();

    expect(() => {
      assertIsOptionalNumber(1);
      assertIsOptionalNumber(undefined);
    }).not.toThrow();
  });
});

describe('assertIsOptionalString()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsOptionalString(false);
    }).toThrow();

    expect(() => {
      assertIsOptionalString('test');
      assertIsOptionalString(undefined);
    }).not.toThrow();
  });
});

describe('assertIsOptionalSymbol()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsOptionalSymbol(false);
    }).toThrow();

    expect(() => {
      assertIsOptionalSymbol(Symbol());
      assertIsOptionalSymbol(undefined);
    }).not.toThrow();
  });
});

describe('assertIsStringArray()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsStringArray([]);
    }).not.toThrow();

    expect(() => {
      assertIsStringArray(['test']);
    }).not.toThrow();

    expect(() => {
      assertIsStringArray([123]);
    }).toThrow();
  });
});

describe('assertIsNumberArray()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsNumberArray([]);
    }).not.toThrow();

    expect(() => {
      assertIsNumberArray([123]);
    }).not.toThrow();

    expect(() => {
      assertIsNumberArray(['test']);
    }).toThrow();
  });
});

describe('assertIsBigIntArray()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsBigIntArray([]);
    }).not.toThrow();

    expect(() => {
      assertIsBigIntArray([BigInt(1)]);
    }).not.toThrow();

    expect(() => {
      assertIsBigIntArray(['test']);
    }).toThrow();
  });
});

describe('assertIsBooleanArray()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsBooleanArray([]);
    }).not.toThrow();

    expect(() => {
      assertIsBooleanArray([true, false]);
    }).not.toThrow();

    expect(() => {
      assertIsBooleanArray(['test']);
    }).toThrow();
  });
});

describe('assertIsUndefinedArray()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsUndefinedArray([]);
    }).not.toThrow();

    expect(() => {
      assertIsUndefinedArray([undefined]);
    }).not.toThrow();

    expect(() => {
      assertIsUndefinedArray(['test']);
    }).toThrow();
  });
});

describe('assertIsSymbolArray()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsSymbolArray([]);
    }).not.toThrow();

    expect(() => {
      assertIsSymbolArray([Symbol('test')]);
    }).not.toThrow();

    expect(() => {
      assertIsSymbolArray(['test']);
    }).toThrow();
  });
});

describe('assertIsNullArray()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsNullArray([]);
    }).not.toThrow();

    expect(() => {
      assertIsNullArray([null]);
    }).not.toThrow();

    expect(() => {
      assertIsNullArray(['test']);
    }).toThrow();
  });
});

describe('assertIsPositiveFiniteNumber()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsPositiveFiniteNumber(false);
    }).toThrow();

    expect(() => {
      assertIsPositiveFiniteNumber(1);
    }).not.toThrow();
  });
});

describe('assertIsNumberGTEOne()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsNumberGTEOne(0);
    }).toThrow();

    expect(() => {
      assertIsNumberGTEOne(1);
    }).not.toThrow();
  });
});

describe('assertIsPositiveInteger()', () => {
  it('Throws when input is invalid', () => {
    [-1, 'not a number', Number.NaN, Infinity, Math.PI].forEach(input => {
      expect(() => {
        assertIsPositiveInteger(input);
      }).toThrow();
    });

    [0, -0, 1].forEach(input => {
      expect(() => {
        assertIsPositiveInteger(input);
      }).not.toThrow();
    });
  });
});

describe('assertIsPrimitive()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsPrimitive({});
    }).toThrow();

    expect(() => {
      assertIsPrimitive(null);
    }).not.toThrow();
  });
});

describe('assertIsPromiseFulfilledResult()', () => {
  it('Throws when input is invalid', async () => {
    const [resolved, rejected] = await Promise.allSettled([Promise.resolve(), Promise.reject(new Error('test'))]);

    expect(() => {
      assertIsPromiseFulfilledResult(rejected);
    }).toThrow();

    expect(() => {
      assertIsPromiseFulfilledResult(resolved);
    }).not.toThrow();
  });
});

describe('assertIsPromiseRejectedResult()', () => {
  it('Throws when input is invalid', async () => {
    const [resolved, rejected] = await Promise.allSettled([Promise.resolve(), Promise.reject(new Error('test'))]);

    expect(() => {
      assertIsPromiseRejectedResult(resolved);
    }).toThrow();

    expect(() => {
      assertIsPromiseRejectedResult(rejected);
    }).not.toThrow();
  });
});

describe('assertIsPropertyKey()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsPropertyKey(false);
    }).toThrow();

    expect(() => {
      assertIsPropertyKey('key');
    }).not.toThrow();
  });
});

describe('assertIsString()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsString(false);
    }).toThrow();

    expect(() => {
      assertIsString('test');
    }).not.toThrow();
  });
});

describe('assertIsStringMatching()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsStringMatching('test', /^$/);
    }).toThrow();

    expect(() => {
      assertIsStringMatching('test', /^test$/);
    }).not.toThrow();
  });
});

describe('assertIsStringRecord()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsStringRecord(false);
    }).toThrow();

    expect(() => {
      assertIsStringRecord({
        test: 'test',
      });
    }).not.toThrow();
  });
});

describe('assertIsStringWithLength()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsStringWithLength('');
    }).toThrow();

    expect(() => {
      assertIsStringWithLength('test');
    }).not.toThrow();
  });
});

describe('assertIsSymbol()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsSymbol(false);
    }).toThrow();

    expect(() => {
      assertIsSymbol(Symbol());
    }).not.toThrow();
  });
});

describe('assertIsUndefined()', () => {
  it('Throws when input is invalid', () => {
    expect(() => {
      assertIsUndefined(false);
    }).toThrow();

    expect(() => {
      assertIsUndefined(undefined);
    }).not.toThrow();
  });
});

describe('assertExhaustive()', () => {
  it('Always throws', () => {
    expect(() => {
      assertExhaustive('test' as never);
    }).toThrow();
  });
});
