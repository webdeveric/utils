import { describe, expect, it } from 'vitest';

import { unique } from '../src/unique.js';

describe('unique()', () => {
  it('Yields unique items from an Iterable', () => {
    // cSpell:ignore abbccc
    expect([...unique('abbccc')]).toEqual(['a', 'b', 'c']);

    expect([...unique([1, 2, 2, 3, 3, 3])]).toEqual([1, 2, 3]);

    expect([
      ...unique(
        new Map([
          ['one', 'test'],
          ['two', 'test'],
        ]),
        {
          identity: (item) => item[1],
        },
      ),
    ]).toEqual([['one', 'test']]);
  });

  it('Yields unique items from an AsyncIterable', async () => {
    const demo = async function* (): AsyncGenerator<number> {
      yield 1;
      yield 2;
      yield 2;
      yield 3;
      yield 3;
      yield 3;
    };

    await expect(Array.fromAsync(unique(demo()))).resolves.toEqual([1, 2, 3]);

    await expect(
      Array.fromAsync(
        unique(demo(), {
          filter(item) {
            return item > 1;
          },
        }),
      ),
    ).resolves.toEqual([2, 3]);
  });

  it('Can use a function to identify uniqueness', () => {
    expect([
      ...unique('AaBbCc', {
        identity(item) {
          return item.toLowerCase();
        },
      }),
    ]).toEqual(['A', 'B', 'C']);
  });

  it('Can filter items', () => {
    expect([
      ...unique('ABC', {
        filter(item) {
          return item !== 'C';
        },
      }),
    ]).toEqual(['A', 'B']);
  });

  it('Throws when not given an Iterable or AsyncIterable', () => {
    expect(() => {
      unique(false as unknown as Iterable<boolean>);
    }).toThrow();
  });
});
