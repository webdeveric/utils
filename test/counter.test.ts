import { isGeneratorFunction, isGeneratorObject } from 'node:util/types';

import { describe, expect, it } from 'vitest';

import { counter } from '../src/counter.js';

describe('counter()', () => {
  it('Is a GeneratorFunction', () => {
    expect(isGeneratorFunction(counter)).toBeTruthy();
  });

  it('Returns a Generator', () => {
    expect(isGeneratorObject(counter())).toBeTruthy();
  });

  it('Can provide start and end', () => {
    const generator = counter(10, 12);

    expect([...generator]).toEqual([10, 11, 12]);
  });

  it('Can go negative', () => {
    const generator = counter(0, -5, -2);

    expect([...generator]).toEqual([0, -2, -4]);
  });

  it('Throws when given a zero step', () => {
    expect(() => [...counter(0, 10, 0)]).toThrow();
  });
});
