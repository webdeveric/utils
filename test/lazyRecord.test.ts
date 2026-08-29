import { describe, expect, it, vi } from 'vitest';

import { lazyRecord } from '../src/lazyRecord.js';

describe('lazyRecord()', () => {
  it('Does not call getter functions until the property is accessed', () => {
    const computed = vi.fn(() => 'computed');

    const record = lazyRecord({
      name: 'Name',
      computed,
    });

    expect(computed).not.toHaveBeenCalled();

    expect(record.name).toBe('Name');
    expect(record.computed).toBe('computed');

    expect(computed).toHaveBeenCalledTimes(1);
  });

  it('Only calls each getter once', () => {
    const random = vi.fn(() => Math.random());

    const record = lazyRecord({
      random,
    });

    const first = record.random;
    const second = record.random;

    expect(random).toHaveBeenCalledTimes(1);
    expect(first).toBe(second);
  });

  it('Keeps plain, non-function values as-is', () => {
    const record = lazyRecord({
      name: 'Name',
      count: 1,
    });

    expect(record.name).toBe('Name');
    expect(record.count).toBe(1);
  });

  it('Returns properties that are writable and configurable', () => {
    const record = lazyRecord({
      name: 'Name',
      computed: () => 'computed',
    });

    // Access `computed` so its descriptor gets replaced by the getter's `defineProperty()` call.
    void record.computed;

    record.name = 'Updated';
    record.computed = 'Updated';

    expect(record.name).toBe('Updated');
    expect(record.computed).toBe('Updated');
  });

  it('Has a null prototype', () => {
    const record = lazyRecord({
      name: 'Name',
    });

    expect(Object.getPrototypeOf(record)).toBeNull();
  });

  it('Exposes all keys passed in', () => {
    const record = lazyRecord({
      name: 'Name',
      now: () => Date.now(),
    });

    // Properties are non-enumerable until accessed, so use `getOwnPropertyNames()` instead of `keys()`.
    expect(Object.getOwnPropertyNames(record)).toEqual(['name', 'now']);
  });

  it('Can be a prototype for another object', () => {
    const record = lazyRecord({
      name: 'Name',
      now: () => Date.now(),
    });

    const child = Object.create(record);

    expect(child.name).toBe('Name');
    expect(typeof child.now).toBe('number');
  });
});
