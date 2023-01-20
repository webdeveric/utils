import { describe, it, expect } from 'vitest';

import { parseNumber } from '../src/parseNumber.js';

describe('parseNumber', () => {
  it('Returns numbers', () => {
    expect(parseNumber(1)).toStrictEqual(1);
  });

  it('Parses strings into numbers', () => {
    expect(parseNumber('1')).toStrictEqual(1);
    expect(parseNumber('2.2')).toStrictEqual(2.2);
  });

  it('Converts BitInts into numbers', () => {
    expect(parseNumber(BigInt(1))).toStrictEqual(1);
  });
});
