import { describe, it, expect } from 'vitest';

import { instanceOf } from '../../../src/predicate/factory/instanceOf.js';

describe('instanceOf()', () => {
  it('Returns a type predicate function', () => {
    const fn = instanceOf(Date);

    expect(fn).toBeInstanceOf(Function);
    expect(fn(new Date())).toBeTruthy();
    expect(fn(null)).toBeFalsy();
  });
});
