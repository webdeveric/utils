import { describe, expect, expectTypeOf, it } from 'vitest';

import { defineProperty } from '../src/defineProperty.js';

describe('defineProperty()', () => {
  it('Adds a property with a value', () => {
    const input = { name: 'Test' };

    const result = defineProperty(input, 'age', { value: 42 });

    expect(result).toBe(input);
    expect(result.age).toBe(42);
  });

  it('Adds a property with a getter', () => {
    const result = defineProperty({ name: 'Test' }, 'title', { get: () => 'Software Engineer' });

    expect(result.title).toBe('Software Engineer');
  });

  it('Property is non-enumerable by default, matching Object.defineProperty()', () => {
    const result = defineProperty({ name: 'Test' }, 'age', { value: 42 });

    expect(Object.keys(result)).toEqual(['name']);
    expect(result).toHaveProperty('age', 42);
  });

  it('Respects the provided property descriptor flags', () => {
    const result = defineProperty({ name: 'Test' }, 'age', { value: 42, enumerable: true });

    expect(Object.keys(result)).toEqual(['name', 'age']);
  });

  it('Reflects a `value` attribute in the returned type', () => {
    const result = defineProperty({ name: 'Test' }, 'age', { value: 42 });

    expectTypeOf(result).toEqualTypeOf<{ name: string; readonly age: number }>();
  });

  it('Reflects a `get` attribute in the returned type', () => {
    const result = defineProperty({ name: 'Test' }, 'title', { get: () => 'Software Engineer' });

    expectTypeOf(result).toEqualTypeOf<{ name: string; readonly title: string }>();
  });

  it('Attributes without value or getter have unknown type', () => {
    const result = defineProperty({ name: 'Test' }, 'title', { writable: true });

    // This allows assignment to the `title` property, but the
    // type is unknown because no value or getter was provided.
    result.title = 'tester';

    expectTypeOf(result).toEqualTypeOf<{ name: string; title: unknown }>();
  });

  it('Attributes that are not writable are readonly', () => {
    const result = defineProperty({ name: 'Test' }, 'title', { set: () => 'setter' });

    // This allows assignment to the `title` property, but the
    // type is unknown because no value or getter was provided.
    result.title = 'tester';

    expectTypeOf(result).toEqualTypeOf<{ name: string; title: unknown }>();
  });

  it('A property with only a `value` is not writable, matching Object.defineProperty() defaults', () => {
    const result = defineProperty({ name: 'Test' }, 'age', { value: 42 });

    expect(() => {
      // @ts-expect-error `age` is readonly because `writable` was not set to `true`.
      result.age = 43;
    }).toThrow(TypeError);
  });

  it('A setter that takes a value makes the property writable, even though `writable` was not set', () => {
    let stored: boolean | undefined;

    const result = defineProperty({ name: 'Test' }, 'isAdmin', {
      set(value: boolean) {
        stored = value;
      },
    });

    result.isAdmin = true;

    expect(stored).toBe(true);
    expectTypeOf(result).toEqualTypeOf<{ name: string; isAdmin: boolean }>();
  });

  it('An accessor with both `get` and `set` is writable', () => {
    let value = 'initial';

    const result = defineProperty({ name: 'Test' }, 'title', {
      get: () => value,
      set: (next: string) => {
        value = next;
      },
    });

    result.title = 'updated';

    expect(result.title).toBe('updated');
  });

  it('Redefining an existing writable property without `writable` keeps it writable, matching Object.defineProperty()', () => {
    const input = { name: 'Test' };

    const result = defineProperty(input, 'name', { value: 'New' });

    result.name = 'Newer';

    expect(result.name).toBe('Newer');
  });

  it('Redefining an existing writable property with `writable: false` makes it readonly', () => {
    const result = defineProperty({ name: 'Test' }, 'name', { value: 'New', writable: false });

    expect(() => {
      // @ts-expect-error `name` is readonly because `writable` was explicitly set to `false`.
      result.name = 'Newer';
    }).toThrow(TypeError);
  });

  it('Redefining a non-configurable property throws, matching Object.defineProperty()', () => {
    const input = defineProperty({}, 'age', { value: 42 });

    expect(() => defineProperty(input, 'age', { value: 43 })).toThrow(TypeError);
  });
});
