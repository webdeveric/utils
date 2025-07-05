import { describe, it, expect } from 'vitest';

import { assume } from '../../src/predicate/assume.js';

describe('assume()', () => {
  it.each([1, 'a', true, null, {}, undefined, new Date()])('Always Returns true: %j', (input) => {
    expect(assume(input)).toBeTruthy();
  });
});
