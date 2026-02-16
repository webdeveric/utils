import { describe, expectTypeOf, it } from 'vitest';

import { allOf } from '../../../src/predicate/factory/allOf.js';
import { anyOf } from '../../../src/predicate/factory/anyOf.js';
import { literal } from '../../../src/predicate/factory/literal.js';
import { simple } from '../../../src/predicate/factory/simple.js';
import { withLength } from '../../../src/predicate/factory/withLength.js';

import type { TypePredicateFn } from '../../../src/types/functions.js';

describe('simple()', () => {
  it('Returns a type predicate function', () => {
    const fn = simple(literal(true));

    expectTypeOf(fn).toBeFunction();
    expectTypeOf(fn).parameter(0).toEqualTypeOf<unknown>();
  });

  it('Returns a type predicate function using simplified types', () => {
    expectTypeOf(simple(literal(true))).toEqualTypeOf<TypePredicateFn<boolean>>();

    expectTypeOf(simple(literal('test'))).toEqualTypeOf<TypePredicateFn<string>>();

    expectTypeOf(simple(literal(123))).toEqualTypeOf<TypePredicateFn<number>>();

    expectTypeOf(simple(literal(456n))).toEqualTypeOf<TypePredicateFn<bigint>>();

    expectTypeOf(simple(literal(Symbol.for('test')))).toEqualTypeOf<TypePredicateFn<symbol>>();

    expectTypeOf(simple(literal(undefined))).toEqualTypeOf<TypePredicateFn<undefined>>();

    expectTypeOf(simple(literal(null))).toEqualTypeOf<TypePredicateFn<null>>();

    expectTypeOf(simple(literal({}))).toEqualTypeOf<TypePredicateFn<object>>();

    expectTypeOf(simple(literal([]))).toEqualTypeOf<TypePredicateFn<object>>();

    expectTypeOf(simple(literal(() => true))).toEqualTypeOf<TypePredicateFn<Function>>();

    expectTypeOf(simple(anyOf(literal(true), literal('test')))).toEqualTypeOf<TypePredicateFn<boolean | string>>();

    expectTypeOf(simple(allOf(literal([1, 2, 3, 4]), withLength(Array.isArray, 4)))).toEqualTypeOf<
      TypePredicateFn<unknown[]>
    >();
  });
});
