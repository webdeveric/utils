import { describe, expect, it } from 'vitest';

import { assertIsObject } from '../src/assertion/assertIsObject.js';
import { jsonParse } from '../src/jsonParse.js';

describe('jsonParse()', () => {
  it('Parses a JSON string', () => {
    const unknownData = jsonParse('{"name":"test"}');

    expect(unknownData).toEqual({
      name: 'test',
    });
  });

  it('Can use a reviver function', () => {
    const unknownData = jsonParse('{"name":"test"}', (key, value) => {
      return key === 'name' ? String(value).toUpperCase() : value;
    });

    expect(unknownData).toEqual({
      name: 'TEST',
    });
  });

  it('Can use a type assertion function', () => {
    expect(jsonParse('{"name":"test"}', undefined, assertIsObject)).toEqual({
      name: 'test',
    });

    expect(() => jsonParse('[]', undefined, assertIsObject)).toThrowError();
  });
});
