import { describe, expect, it, vi } from 'vitest';

import { lazyProp } from '../src/lazyProp.js';

import type { UnknownRecord } from '../src/types/records.js';

describe('lazyProp()', () => {
  it('Does not call the getter until the property is accessed', () => {
    const getter = vi.fn(() => 'value');
    const data: UnknownRecord = {};

    Object.defineProperty(data, 'value', lazyProp('value', getter));

    expect(getter).not.toHaveBeenCalled();

    expect(data['value']).toBe('value');

    expect(getter).toHaveBeenCalledTimes(1);
  });

  it('Only calls the getter once', () => {
    const getter = vi.fn(() => Math.random());
    const data: UnknownRecord = {};

    Object.defineProperty(data, 'value', lazyProp('value', getter));

    const first = data['value'];
    const second = data['value'];

    expect(getter).toHaveBeenCalledTimes(1);
    expect(first).toBe(second);
  });

  it('Replaces the property with a plain, writable, configurable value', () => {
    const getter = vi.fn(() => 'computed');
    const data: UnknownRecord = {};

    Object.defineProperty(data, 'value', lazyProp('value', getter));

    void data['value'];

    const descriptor = Object.getOwnPropertyDescriptor(data, 'value');

    expect(descriptor).toMatchObject({
      value: 'computed',
      writable: true,
      configurable: true,
      enumerable: false,
    });

    data['value'] = 'updated';

    expect(data['value']).toBe('updated');
    expect(getter).toHaveBeenCalledTimes(1);
  });

  it('Works with symbol keys', () => {
    const key = Symbol('value');
    const getter = vi.fn(() => 'symbol value');
    const data: UnknownRecord = {};

    Object.defineProperty(data, key, lazyProp(key, getter));

    expect(data[key]).toBe('symbol value');
    expect(getter).toHaveBeenCalledTimes(1);
  });
});
