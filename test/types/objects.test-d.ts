import { describe, expectTypeOf, it } from 'vitest';

import type { PathValue, GetValueForKey } from '../../src/types/objects.js';

describe('GetValueForKey', () => {
  it('Gets the value for a key in an object', () => {
    expectTypeOf<GetValueForKey<{ a: 1; b: 2 }, 'a'>>().toEqualTypeOf<1>();
  });

  it('Gets the value for a key in an array', () => {
    expectTypeOf<GetValueForKey<[1, 2, 3], '0'>>().toEqualTypeOf<1>();
    expectTypeOf<GetValueForKey<[1, 2, 3], 0>>().toEqualTypeOf<1>();
    expectTypeOf<GetValueForKey<[1, 2, 3], 4>>().toEqualTypeOf<undefined>();

    expectTypeOf<GetValueForKey<string[], '0'>>().toEqualTypeOf<string>();
    expectTypeOf<GetValueForKey<string[], 0>>().toEqualTypeOf<string>();
  });
});

describe('PathValue', () => {
  it('Gets the value from Type using path dot notation', () => {
    const input = {
      name: {
        first: 'Test',
        last: 'Testerson',
      },
      age: 100_000,
      role: [
        {
          job: {
            title: 'Developer',
          },
        },
      ],
    };

    expectTypeOf<PathValue<typeof input, 'name.first'>>().toEqualTypeOf<string>();
    expectTypeOf<PathValue<typeof input, 'age'>>().toEqualTypeOf<number>();
    expectTypeOf<PathValue<typeof input, 'role.0.job.title'>>().toEqualTypeOf<string>();
  });

  it('Gets the value from a const Type using path dot notation', () => {
    const input = {
      name: {
        first: 'Test',
        last: 'Testerson',
      },
      age: 100_000,
      role: [
        {
          job: {
            title: 'Developer',
          },
        },
        { name: 'Tester' },
      ],
    } as const;

    expectTypeOf<PathValue<typeof input, 'name.first'>>().toEqualTypeOf<'Test'>();
    expectTypeOf<PathValue<typeof input, 'age'>>().toEqualTypeOf<100_000>();
    expectTypeOf<PathValue<typeof input, 'role.0.job.title'>>().toEqualTypeOf<'Developer'>();
    expectTypeOf<PathValue<typeof input, 'role.1.name'>>().toEqualTypeOf<'Tester'>();
  });

  it('Handles optional properties', () => {
    type Input = {
      name: string;
      job?: {
        title: string;
      };
      details?: null | {
        count: number;
      };
    };

    expectTypeOf<PathValue<Input, 'job.title'>>().toEqualTypeOf<string | undefined>();
    expectTypeOf<PathValue<Input, 'details'>>().toEqualTypeOf<null | undefined | { count: number }>();
    expectTypeOf<PathValue<Input, 'name'>>().toEqualTypeOf<string>();
  });
});
