import { describe, it, expect } from 'vitest';

import { typeOf } from '../../../src/predicate/factory/typeOf.js';

describe('typeOf()', () => {
  it('Returns a type predicate function', () => {
    const fn = typeOf('boolean');

    expect(fn).toBeInstanceOf(Function);
    expect(fn(true)).toBeTruthy();
    expect(fn('')).toBeFalsy();
    expect(fn(undefined)).toBeFalsy();
  });
});
