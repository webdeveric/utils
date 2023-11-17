import { describe, it, expect } from 'vitest';

import { uniqueItems } from '../src/uniqueItems.js';

describe('uniqueItems()', () => {
  it('Returns unique items from an array', () => {
    const data = [1, 1, 1];

    expect(uniqueItems(data)).toStrictEqual([1]);
  });
});
