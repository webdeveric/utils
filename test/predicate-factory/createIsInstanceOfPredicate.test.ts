import { describe, it, expect } from 'vitest';

import { createIsInstanceOfPredicate } from '../../src/predicate-factory/createIsInstanceOfPredicate.js';

describe('createIsInstanceOfPredicate()', () => {
  it('Returns a type predicate function', () => {
    const fn = createIsInstanceOfPredicate(Date);

    expect(fn).toBeInstanceOf(Function);
    expect(fn(new Date())).toBeTruthy();
    expect(fn(null)).toBeFalsy();
  });
});
