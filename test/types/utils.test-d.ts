import { describe, expectTypeOf, it } from 'vitest';

import type { HasOnlyNumericKeys } from '../../src/types/utils.js';

describe('HasOnlyNumericKeys', () => {
  it('should return false for non-numeric keys', () => {
    expectTypeOf<HasOnlyNumericKeys<{ name: string }>>().toEqualTypeOf<false>();
  });

  it('should return true for objects with numeric keys', () => {
    expectTypeOf<HasOnlyNumericKeys<{ 0: string }>>().toEqualTypeOf<true>();
  });
});
