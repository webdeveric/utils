import { describe, expect, expectTypeOf, it } from 'vitest';

import { defineProperties } from '../src/defineProperties.js';

describe('defineProperties()', () => {
  it('Adds multiple properties from a descriptor map', () => {
    const result = defineProperties(
      { name: 'Test' },
      {
        age: { value: 42 },
        isAdmin: { get: () => false },
      },
    );

    expect(result.name).toBe('Test');
    expect(result.age).toBe(42);
    expect(result.isAdmin).toBe(false);
  });

  it('Returns the same object reference that was passed in', () => {
    const input = { name: 'Test' };

    const result = defineProperties(input, { age: { value: 42 } });

    expect(result).toBe(input);
  });

  it('Adding an empty descriptor map returns the input unchanged', () => {
    const input = { name: 'Test' };

    const result = defineProperties(input, {});

    expect(result).toEqual(input);
  });

  it('Reflects every property from the descriptor map in the returned type', () => {
    const result = defineProperties(
      { name: 'Test' },
      {
        age: { value: 42 },
        isAdmin: { get: () => false },
      },
    );

    expectTypeOf(result).toEqualTypeOf<{ name: string; readonly age: number; readonly isAdmin: boolean }>();
  });

  it('Attributes without value or getter have unknown type', () => {
    const result = defineProperties(
      { name: 'Test' },
      {
        age: {
          value: 42,
          writable: true,
        },
        isAdmin: {
          set(_: boolean) {},
        },
        title: {
          writable: true,
        },
      },
    );

    // `isAdmin` has a setter that takes a value, so it's writable even though
    // `writable` was never set, matching real Object.defineProperty() behavior.
    result.isAdmin = true;

    // This allows assignment to the `title` property, but the
    // type is unknown because no value or getter was provided.
    result.title = 'tester';

    expectTypeOf(result).toEqualTypeOf<{ name: string; age: number; isAdmin: boolean; title: unknown }>();
  });

  it('A property with only a `value` is not writable, matching Object.defineProperty() defaults', () => {
    const result = defineProperties({ name: 'Test' }, { age: { value: 42 } });

    expect(() => {
      // @ts-expect-error `age` is readonly because `writable` was not set to `true`.
      result.age = 43;
    }).toThrow(TypeError);
  });

  it('Redefining an existing writable property without `writable` keeps it writable, matching Object.defineProperty()', () => {
    const input = { name: 'Test' };

    const result = defineProperties(input, { name: { value: 'New' } });

    result.name = 'Newer';

    expect(result.name).toBe('Newer');
  });

  it('Redefining an existing writable property with `writable: false` makes it readonly', () => {
    const result = defineProperties({ name: 'Test' }, { name: { value: 'New', writable: false } });

    expect(() => {
      // @ts-expect-error `name` is readonly because `writable` was explicitly set to `false`.
      result.name = 'Newer';
    }).toThrow(TypeError);
  });

  it('Redefining a non-configurable property throws, matching Object.defineProperty()', () => {
    const input = defineProperties({}, { age: { value: 42 } });

    expect(() => defineProperties(input, { age: { value: 43 } })).toThrow(TypeError);
  });
});
