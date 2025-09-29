import { describe, expectTypeOf, it } from 'vitest';

import type { DeepPartial, HasOnlyNumericKeys, ParseNumber } from '../../src/types/utils.js';

describe('HasOnlyNumericKeys', () => {
  it('should return false for non-numeric keys', () => {
    expectTypeOf<HasOnlyNumericKeys<{ name: string }>>().toEqualTypeOf<false>();
  });

  it('should return true for objects with numeric keys', () => {
    expectTypeOf<HasOnlyNumericKeys<{ 0: string }>>().toEqualTypeOf<true>();
  });
});

describe('ParseNumber', () => {
  it('should return never for non-numeric strings', () => {
    expectTypeOf<ParseNumber<'name'>>().toEqualTypeOf<never>();
    expectTypeOf<ParseNumber<'Infinity'>>().toEqualTypeOf<never>();
  });

  it('should return the number for numeric strings', () => {
    expectTypeOf<ParseNumber<'123' | '456'>>().toEqualTypeOf<123 | 456>();
    expectTypeOf<ParseNumber<'123.456'>>().toEqualTypeOf<123.456>();
    expectTypeOf<ParseNumber<'-789'>>().toEqualTypeOf<-789>();
  });
});

describe('DeepPartial', () => {
  it('should make all properties optional', () => {
    expectTypeOf<
      DeepPartial<{
        a: number;
        b: { c: string };
        d: {
          e: boolean;
          f: symbol[][];
        }[];
      }>
    >().toEqualTypeOf<{
      a?: number;
      b?: {
        c?: string;
      };
      d?: {
        e?: boolean;
        f?: symbol[][];
      }[];
    }>();
  });

  it('handles primitives', () => {
    expectTypeOf<DeepPartial<string>>().toEqualTypeOf<string>();
    expectTypeOf<DeepPartial<number>>().toEqualTypeOf<number>();
    expectTypeOf<DeepPartial<boolean>>().toEqualTypeOf<boolean>();
  });

  it('handles arrays of primitives', () => {
    expectTypeOf<DeepPartial<string[]>>().toEqualTypeOf<string[]>();
    expectTypeOf<DeepPartial<number[]>>().toEqualTypeOf<number[]>();
    expectTypeOf<DeepPartial<boolean[]>>().toEqualTypeOf<boolean[]>();
  });
});
