import { describe, expect, it } from 'vitest';

import { getSortedObject } from '../src/getSortedObject.js';
import { isString } from '../src/predicate/isString.js';
import { byReverseOf } from '../src/sort/factory/byReverseOf.js';

describe('getSortedObject()', () => {
  it('should return a sorted object', () => {
    const input = {
      b: 2,
      a: 1,
      c: 3,
    };

    const serializedInput = JSON.stringify(input);

    const expectedSerializedOutput = JSON.stringify({
      a: 1,
      b: 2,
      c: 3,
    });

    const serializedOutput = getSortedObject(input);

    expect(JSON.stringify(serializedOutput)).toEqual(expectedSerializedOutput);
    expect(serializedInput).not.toEqual(serializedOutput);
  });

  it('handles nested objects', () => {
    const input = {
      b: {
        d: 4,
        c: 3,
      },
      a: [
        { e: 5, f: 6 },
        { h: 8, g: 7 },
      ],
      c: 3,
    };

    const serializedInput = JSON.stringify(input);

    const expectedSerializedOutput = JSON.stringify({
      a: [
        { e: 5, f: 6 },
        { g: 7, h: 8 },
      ],
      b: {
        c: 3,
        d: 4,
      },
      c: 3,
    });

    const serializedOutput = getSortedObject(input);

    expect(JSON.stringify(serializedOutput)).toEqual(expectedSerializedOutput);
    expect(serializedInput).not.toEqual(serializedOutput);
  });

  it('handles empty objects', () => {
    expect(JSON.stringify(getSortedObject({}))).toEqual('{}');
    expect(JSON.stringify(getSortedObject([]))).toEqual('[]');
  });

  it('handles array of objects', () => {
    expect(JSON.stringify(getSortedObject([{ b: 2, a: 1, c: 3 }]))).toEqual('[{"a":1,"b":2,"c":3}]');
  });

  it('accepts custom comparator', () => {
    expect(
      JSON.stringify(
        getSortedObject(
          [{ b: 2, a: 1, c: 3 }],
          byReverseOf((left, right) => {
            return isString(left) && isString(right) ? left.localeCompare(right) : 0;
          }),
        ),
      ),
    ).toEqual('[{"c":3,"b":2,"a":1}]');
  });

  it('handles Symbol properties', () => {
    const symbolProperty = Symbol('property');

    const input = {
      b: 2,
      a: 1,
      [symbolProperty]: 'symbolValue',
    };

    expect(Reflect.ownKeys(getSortedObject(input))).toEqual(['a', 'b', symbolProperty]);
  });
});
