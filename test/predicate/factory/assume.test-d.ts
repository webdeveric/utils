import { describe, expectTypeOf, it } from 'vitest';

import { assume } from '../../../src/predicate/assume.js';

import type { TypePredicateFn } from '../../../src/types/functions.js';

describe('assume()', () => {
  it('Is a type predicate function', () => {
    expectTypeOf(assume).toBeFunction();
    expectTypeOf(assume).parameter(0).toEqualTypeOf<unknown>();

    expectTypeOf(assume<string>).toEqualTypeOf<TypePredicateFn<string>>();
    expectTypeOf(assume<number>).toEqualTypeOf<TypePredicateFn<number>>();
    expectTypeOf(assume<bigint>).toEqualTypeOf<TypePredicateFn<bigint>>();
    expectTypeOf(assume<boolean>).toEqualTypeOf<TypePredicateFn<boolean>>();
    expectTypeOf(assume<symbol>).toEqualTypeOf<TypePredicateFn<symbol>>();
    expectTypeOf(assume<undefined>).toEqualTypeOf<TypePredicateFn<undefined>>();
    expectTypeOf(assume<null>).toEqualTypeOf<TypePredicateFn<null>>();
    expectTypeOf(assume<object>).toEqualTypeOf<TypePredicateFn<object>>();
    // eslint-disable-next-line @typescript-eslint/ban-types
    expectTypeOf(assume<Function>).toEqualTypeOf<TypePredicateFn<Function>>();
    expectTypeOf(assume<unknown>).toEqualTypeOf<TypePredicateFn<unknown>>();
    expectTypeOf(assume<string[]>).toEqualTypeOf<TypePredicateFn<string[]>>();
  });
});
