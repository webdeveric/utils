import { describe, expectTypeOf, it } from 'vitest';

import { literal } from '../../../src/predicate/factory/literal.js';
import { record } from '../../../src/predicate/factory/record.js';
import { isNumber } from '../../../src/predicate/isNumber.js';
import { isString } from '../../../src/predicate/isString.js';

import type { TypePredicateFn } from '../../../src/types/functions.js';

describe('record()', () => {
  it('Returns a type predicate function', () => {
    const fn = record(isString, isNumber);

    expectTypeOf(fn).toBeFunction();
    expectTypeOf(fn).parameter(0).toEqualTypeOf<unknown>();
    expectTypeOf(fn).toEqualTypeOf<TypePredicateFn<Record<string, number>>>();
  });

  it('Narrows input', () => {
    const input: unknown = { a: 1 };

    if (record(literal('a'), isNumber)(input)) {
      expectTypeOf(input).toEqualTypeOf<Record<'a', number>>();
    }
  });

  it('Only accepts string or symbol key predicates', () => {
    expectTypeOf(record).parameter(0).toEqualTypeOf<TypePredicateFn<string | symbol>>();

    // @ts-expect-error: number keys are not supported since object keys are strings or symbols.
    record(isNumber, isNumber);
  });
});
