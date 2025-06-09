import { isGeneratorFunction } from 'node:util/types';

import { describe, expect, it } from 'vitest';

import { chunk } from '../src/chunk.js';

describe('chunk()', () => {
  it('Returns a generator', () => {
    expect(isGeneratorFunction(chunk)).toBeTruthy();
  });

  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'Should throw an error if chunkSize is invalid: "%s"',
    (chunkSize) => {
      expect(() => Array.from(chunk([], chunkSize))).toThrow();
    },
  );

  it('Yields arrays with length not to exceed chunkSize', () => {
    expect(Array.from(chunk(['a', 'b'], 10))).toEqual([['a', 'b']]);
    expect(Array.from(chunk(['a', 'b'], 1))).toEqual([['a'], ['b']]);
    expect(Array.from(chunk(['a', 'b', 'c'], 2))).toEqual([['a', 'b'], ['c']]);
  });

  it('Returns input if it is empty', () => {
    const fn = chunk([], 10);

    expect(fn.next().value).toEqual([]);
    expect(fn.next()).toEqual({
      done: true,
      value: undefined,
    });
  });
});
