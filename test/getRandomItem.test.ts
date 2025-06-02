import { describe, expect, it } from 'vitest';

import { getRandomItem } from '../src/getRandomItem.js';

describe('getRandomItem()', () => {
  it('Returns a random item from an array', () => {
    expect(getRandomItem([1])).toEqual(1);

    expect(getRandomItem([1, 2, 3])).toBeTypeOf('number');
  });

  it('Returns undefined when input is empty', () => {
    expect(getRandomItem([])).toBeUndefined();
  });
});
