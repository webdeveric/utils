import { isGeneratorFunction } from 'node:util/types';

import { describe, expect, it } from 'vitest';

import { unique } from '../src/unique.js';

describe('unique()', () => {
  it('Is a generator', () => {
    expect(isGeneratorFunction(unique)).toBeTruthy();
  });

  it('Delegate iteration to Set', () => {
    expect([...unique(new Set([1, 2, 3]))]).toEqual([1, 2, 3]);
  });

  it('Yields unique items', () => {
    // cSpell:ignore abbccc
    expect([...unique('abbccc')]).toEqual(['a', 'b', 'c']);

    expect([...unique([1, 2, 2, 3, 3, 3])]).toEqual([1, 2, 3]);

    expect([
      ...unique(
        new Map([
          ['one', 'test'],
          ['two', 'test'],
        ]),
        item => item[1],
      ),
    ]).toEqual([['one', 'test']]);
  });

  it('Can use a function to identify uniqueness', () => {
    expect([...unique('AaBbCc', item => item.toLowerCase())]).toEqual(['A', 'B', 'C']);
  });
});
