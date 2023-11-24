import { isGeneratorObject } from 'node:util/types';

import { describe, expect, it } from 'vitest';

import { cartesian } from '../src/cartesian.js';

describe('cartesian()', () => {
  it('Returns a Generator', () => {
    expect(isGeneratorObject(cartesian([1, 2, 3]))).toBeTruthy();
  });

  it('Generates cartesian product from input', () => {
    expect(Array.from(cartesian(['a', 'b'], [1, 2]))).toEqual([
      ['a', 1],
      ['b', 1],
      ['a', 2],
      ['b', 2],
    ]);
  });
});
