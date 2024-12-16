import { isGeneratorFunction, isGeneratorObject } from 'node:util/types';

import { describe, expect, it } from 'vitest';

import { iterateForever } from '../src/iterateForever.js';

describe('iterateForever()', () => {
  it('Is a GeneratorFunction', () => {
    expect(isGeneratorFunction(iterateForever)).toBeTruthy();
  });

  it('Returns a Generator', () => {
    expect(isGeneratorObject(iterateForever([1]))).toBeTruthy();
  });

  it('Iterates an iterable forever', () => {
    const forever = iterateForever([1]);

    expect(forever.next().value).toEqual(1);
    expect(forever.next().value).toEqual(1);
  });
});
