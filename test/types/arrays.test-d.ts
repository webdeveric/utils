import { describe, expectTypeOf, it } from 'vitest';

import type { First, Last, Head, Tail, GetLength, IfLength, IfEmpty, IfArray } from '../../src/types/arrays.js';

describe('First', () => {
  it('returns the first element of an array', () => {
    expectTypeOf<First<[1, 2, 3]>>().toEqualTypeOf<1>();
  });
});

describe('Last', () => {
  it('returns the last element of an array', () => {
    expectTypeOf<Last<[1, 2, 3]>>().toEqualTypeOf<3>();
  });
});

describe('Head', () => {
  it('returns all but the last element of an array', () => {
    expectTypeOf<Head<[1, 2, 3]>>().toEqualTypeOf<[1, 2]>();
  });
});

describe('Tail', () => {
  it('returns all but the first element of an array', () => {
    expectTypeOf<Tail<[1, 2, 3]>>().toEqualTypeOf<[2, 3]>();
  });
});

describe('GetLength', () => {
  it('returns the length of an array', () => {
    expectTypeOf<GetLength<[1, 2, 3]>>().toEqualTypeOf<3>();
  });
});

describe('IfLength', () => {
  it('returns the true type if the array length matches the specified length', () => {
    expectTypeOf<IfLength<[1, 2, 3], 3, 'yes', 'no'>>().toEqualTypeOf<'yes'>();
  });

  it('returns the false type if the array length does not match the specified length', () => {
    expectTypeOf<IfLength<[1, 2, 3], 2, 'yes', 'no'>>().toEqualTypeOf<'no'>();
  });
});

describe('IfEmpty', () => {
  it('returns the true type if the array is empty', () => {
    expectTypeOf<IfEmpty<[], 'yes', 'no'>>().toEqualTypeOf<'yes'>();
  });

  it('returns the false type if the array is not empty', () => {
    expectTypeOf<IfEmpty<[1, 2, 3], 'yes', 'no'>>().toEqualTypeOf<'no'>();
  });
});

describe('IfArray', () => {
  it('returns the true type if the type is an array', () => {
    expectTypeOf<IfArray<[], 'yes', 'no'>>().toEqualTypeOf<'yes'>();
  });

  it('returns the false type if the type is not an array', () => {
    expectTypeOf<IfArray<number, 'yes', 'no'>>().toEqualTypeOf<'no'>();
  });
});
