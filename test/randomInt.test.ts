import { describe, expect, it } from 'vitest';

import { randomInt } from '../src/randomInt.js';

describe('randomInt()', () => {
  it('Returns early when min and max are the same', () => {
    expect(randomInt(0, 0)).toEqual(0);
  });

  it('Returns a random integer', () => {
    const value = randomInt(100, 200);

    expect(value).greaterThanOrEqual(100);
    expect(value).lessThan(200);
  });

  it('The returns value is inclusive of min and exclusive of max', () => {
    expect(randomInt(0, 1)).toEqual(0);
    expect(randomInt(-2, -1)).toEqual(-2);
    expect(randomInt(10, 11)).toEqual(10);
  });

  it('Takes an options object', () => {
    const value = randomInt({ max: 1000 });

    expect(value).greaterThanOrEqual(Number.MIN_SAFE_INTEGER);
    expect(value).lessThan(1000);
  });

  it('Defaults to SAFE_INTEGER range', () => {
    const value = randomInt();

    expect(value).greaterThanOrEqual(Number.MIN_SAFE_INTEGER);
    expect(value).lessThan(Number.MAX_SAFE_INTEGER);
  });

  it('Throws when min > max', () => {
    expect(() => {
      randomInt(100, 0);
    }).toThrow();
  });
});
