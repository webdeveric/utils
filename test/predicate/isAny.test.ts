import { describe, it, expect } from 'vitest';

import { isAny } from '../../src/predicate/isAny.js';

describe('isAny()', () => {
  it.each([1, 'a', true, null, {}, undefined])('Always Returns true: %j', (input) => {
    expect(isAny(input)).toBeTruthy();
  });
});
