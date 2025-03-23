import { describe, it, expect } from 'vitest';

import { isUnknown } from '../../src/predicate/isUnknown.js';

describe('isUnknown()', () => {
  it.each([1, 'a', true, null, {}, undefined])('Always Returns true: %j', (input) => {
    expect(isUnknown(input)).toBeTruthy();
  });
});
