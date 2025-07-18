import { describe, expectTypeOf, it } from 'vitest';

import { getRandomItem } from '../src/getRandomItem.js';

describe('getRandomItem()', () => {
  it('Returns a random item from an array', () => {
    const data: number[] = [1, 2, 3];

    const randomItem = getRandomItem(data);

    expectTypeOf<typeof randomItem>().toEqualTypeOf<number | undefined>();
  });

  it('Returns a random item from a const array (tuple)', () => {
    const data = [1, 2, 3] as const satisfies number[];

    const randomItem = getRandomItem(data);

    expectTypeOf<typeof randomItem>().toEqualTypeOf<1 | 2 | 3>();
  });

  it('Returns `undefined` from an empty array', () => {
    const data: never[] = [];

    const randomItem = getRandomItem(data);

    expectTypeOf<typeof randomItem>().toEqualTypeOf<undefined>();
  });

  it('Returns `T | undefined` from an untyped array', () => {
    const data = ['a', 'b', 'c', 1, 2, 3];

    const randomItem = getRandomItem(data);

    expectTypeOf<typeof randomItem>().toEqualTypeOf<string | number | undefined>();
  });
});
