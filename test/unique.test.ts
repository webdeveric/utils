import { BloomFilter } from '@webdeveric/ts-data-structures/bloom-filter';
import { describe, expect, it, vi } from 'vitest';

import { unique, type MembershipStore } from '../src/unique.js';

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

  it('Can use a custom MembershipStore via the `store` option', () => {
    const has = vi.fn((value: unknown) => value === 2);
    const add = vi.fn();

    const store: MembershipStore<unknown> = { has, add };

    expect([...unique([1, 2, 3], { store })]).toEqual([1, 3]);

    expect(has).toHaveBeenCalledWith(1);
    expect(has).toHaveBeenCalledWith(2);
    expect(has).toHaveBeenCalledWith(3);
    expect(add).toHaveBeenCalledWith(1);
    expect(add).not.toHaveBeenCalledWith(2);
    expect(add).toHaveBeenCalledWith(3);
  });

  it('Can use a BloomFilter as the MembershipStore via the `store` option', () => {
    const store = BloomFilter.optimal(4, 0.01, (input) => {
      let h1 = 0;
      let h2 = 0;

      const value = JSON.stringify(input);

      for (let i = 0; i < value.length; i++) {
        const code = value.charCodeAt(i);

        h1 = (h1 * 31 + code) | 0;
        h2 = (h2 * 17 + code) | 0;
      }

      return [h1, h2];
    });

    expect([...unique([1, 2, 2, 3, 3, 3], { store })]).toEqual([1, 2, 3]);
  });

  it('Shares uniqueness state across calls when the same `store` is reused', () => {
    const store: MembershipStore<unknown> = new Set();

    expect([...unique([1, 2, 3], { store })]).toEqual([1, 2, 3]);
    expect([...unique([2, 3, 4], { store })]).toEqual([4]);
  });

  it('Uses the `store` option with an AsyncIterable', async () => {
    const demo = async function* (): AsyncGenerator<number> {
      yield 1;
      yield 2;
      yield 2;
      yield 3;
    };

    await expect(Array.fromAsync(unique(demo(), { store: new Set([2]) }))).resolves.toEqual([1, 3]);
  });
});
