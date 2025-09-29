import { describe, expect, it } from 'vitest';

import { byRandom } from '../../src/sort/byRandom.js';

describe('byRandom', () => {
  it('should sort items randomly', () => {
    expect(byRandom()).toBeOneOf([-1, 0, 1]);
  });

  it('can be used to shuffle an array', () => {
    const data = [1, 2, 3, 4, 5];
    const shuffledData = data.toSorted(byRandom);

    expect(shuffledData).toHaveLength(data.length);
    expect(shuffledData).toEqual(expect.arrayContaining(data));
  });
});
