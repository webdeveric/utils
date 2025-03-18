import { describe, expectTypeOf, it } from 'vitest';

import { range } from '../../../src/predicate/factory/range.js';

import type { TypePredicateFn } from '../../../src/types/functions.js';

describe('range()', () => {
  it('Returns a type predicate function', () => {
    expectTypeOf(range(1, 100)).toEqualTypeOf<TypePredicateFn<number>>();
    expectTypeOf(range(1n, 100n)).toEqualTypeOf<TypePredicateFn<bigint>>();
  });
});
