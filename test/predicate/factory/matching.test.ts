import { describe, it, expect } from 'vitest';

import { matching } from '../../../src/predicate/factory/matching.js';

describe('matching()', () => {
  const pattern = /.+/;

  it('Returns a type predicate function', () => {
    expect(matching(pattern)).toBeInstanceOf(Function);
  });

  it('Checks if input matches the RegExp', () => {
    const fn = matching(pattern);

    expect(fn('Test')).toBeTruthy();
    expect(fn('')).toBeFalsy();
    expect(fn(false)).toBeFalsy();
  });
});
