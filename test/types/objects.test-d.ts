import { describe, expectTypeOf, it } from 'vitest';

import type { PathValue, GetValueForKey, ValidKeys, FromPath, WithPath, Merge } from '../../src/types/objects.js';

describe('FromPath', () => {
  it('Builds a type that matches the given path', () => {
    expectTypeOf<FromPath<'name', string>>().toEqualTypeOf<{
      name: string;
    }>();

    expectTypeOf<FromPath<'job.title', string>>().toEqualTypeOf<{
      job: {
        title: string;
      };
    }>();

    expectTypeOf<FromPath<'job.0.title', string>>().toEqualTypeOf<{
      job: {
        0: {
          title: string;
        };
      };
    }>();

    expectTypeOf<FromPath<'some.path', { data: true }>>().toEqualTypeOf<{
      some: {
        path: {
          data: true;
        };
      };
    }>();
  });
});

describe('ValidKeys', () => {
  it('Returns valid keys for an object', () => {
    const user = {
      name: 'Test Testerson',
      [Symbol('age')]: 42,
      job: {
        title: 'Tester',
      },
    };

    expectTypeOf<ValidKeys<typeof user>>().toEqualTypeOf<'name' | 'job'>();
    expectTypeOf<ValidKeys<object>>().toEqualTypeOf<never>();
  });

  it('Returns valid keys for an array', () => {
    const tuple = ['a', 'b', 'c'] as const;

    type SampleTuple = [a: string, b: string, c: string];

    expectTypeOf<ValidKeys<string[]>>().toEqualTypeOf<number | 'length'>();

    expectTypeOf<ValidKeys<never[]>>().toEqualTypeOf<'length'>();

    expectTypeOf<ValidKeys<SampleTuple>>().toEqualTypeOf<number | '0' | '1' | '2' | 'length'>();

    expectTypeOf<ValidKeys<typeof tuple>>().toEqualTypeOf<number | '0' | '1' | '2' | 'length'>();
  });
});

describe('GetValueForKey', () => {
  it('Gets the value for a key in an object', () => {
    expectTypeOf<GetValueForKey<{ a: 1; b: 2 }, 'a'>>().toEqualTypeOf<1>();
  });

  it('Gets the value for a key in an array', () => {
    expectTypeOf<GetValueForKey<[1, 2, 3], '0'>>().toEqualTypeOf<1>();
    expectTypeOf<GetValueForKey<[1, 2, 3], 0>>().toEqualTypeOf<1>();
    expectTypeOf<GetValueForKey<[1, 2, 3], 4>>().toEqualTypeOf<undefined>();

    expectTypeOf<GetValueForKey<string[], '0'>>().toEqualTypeOf<string | undefined>();
    expectTypeOf<GetValueForKey<string[], 0>>().toEqualTypeOf<string | undefined>();
  });
});

describe('PathValue', () => {
  it('Returns `never` for `object` inputs', () => {
    expectTypeOf<PathValue<object, 'name'>>().toEqualTypeOf<never>();
  });

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
    expectTypeOf<PathValue<typeof input, 'role.0.job.title'>>().toEqualTypeOf<string | undefined>();
    expectTypeOf<PathValue<typeof input, 'fake.property'>>().toEqualTypeOf<never>();
    expectTypeOf<PathValue<typeof input, string>>().toEqualTypeOf<never>();
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

describe('Merge', () => {
  it('Merges two object types', () => {
    expectTypeOf<Merge<{ name: string; pets: { name: string }[] }, { job: { title: string } }>>().toEqualTypeOf<{
      name: string;
      pets: { name: string }[];
      job: { title: string };
    }>();
  });

  it('Handles specific array indexes', () => {
    type Data = Merge<{ pets: { name: string }[] }, { pets: { 0: { age: number } } }>;

    expectTypeOf<Data['pets'][number]>().toEqualTypeOf<{ name: string }>();
    expectTypeOf<Data['pets'][0]>().toEqualTypeOf<{ name: string; age: number }>();
  });

  it('Works with FromPath', () => {
    type Base = {
      name: string;
      job: {
        title: string;
      }[];
    };

    type ExtraJobDetails = {
      job: {
        0: {
          startDate: Date;
        };
      };
    };

    type ExtraJobDetailsFromPath = FromPath<'job.0.startDate', Date>;

    type ExpectedType = {
      name: string;
      job: {
        title: string;
      }[] & {
        0: {
          title: string;
          startDate: Date;
        };
      };
    };

    expectTypeOf<Merge<Base, ExtraJobDetails>>().toMatchObjectType<ExpectedType>();

    expectTypeOf<Merge<Base, ExtraJobDetailsFromPath>>().toMatchObjectType<ExpectedType>();
  });
});

describe('WithPath', () => {
  it('Generate a new type of and object with a specific path', () => {
    expectTypeOf<WithPath<{ name: string }, 'job.title'>>().toEqualTypeOf<{
      name: string;
      job: {
        title: unknown;
      };
    }>();

    expectTypeOf<WithPath<{ name: string }, 'job.title', string>>().toEqualTypeOf<{
      name: string;
      job: {
        title: string;
      };
    }>();
  });

  it('Handles paths with array indexes', () => {
    expectTypeOf<
      WithPath<
        {
          name: string;
          job: {
            title: string;
          }[];
        },
        'job.0.startDate',
        Date
      >
    >().toEqualTypeOf<{
      name: string;
      job: { title: string }[] & {
        0: {
          title: string;
          startDate: Date;
        };
      };
    }>();
  });
});
