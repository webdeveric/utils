import { describe, it, expect } from 'vitest';

import { nonNullable } from '../../../src/predicate/factory/nonNullable.js';

describe('nonNullable()', () => {
  const predicate = (input: unknown): input is 'testing' | null | undefined => {
    const values: unknown[] = ['testing', null, undefined];

    return values.includes(input);
  };

  it('Returns a type predicate function', () => {
    expect(nonNullable(predicate)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const fn = nonNullable(predicate);

    expect(fn('testing')).toBeTruthy();
    expect(fn('something else')).toBeFalsy();
    expect(fn(null)).toBeFalsy();
    expect(fn(undefined)).toBeFalsy();
  });
});
