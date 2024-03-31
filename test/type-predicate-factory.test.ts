import { describe, it, expect, vi } from 'vitest';

import { isBoolean } from '../src/predicate/isBoolean.js';
import {
  createIsEnumPredicate,
  createStringMatchingPredicate,
  everyItem,
  maybeArray,
  maybeNull,
  maybeUndefined,
} from '../src/predicate-factory/index.js';

describe('createIsEnumPredicate()', () => {
  enum Demo {
    Demo = 'Demo',
  }

  it('Returns a type predicate function', () => {
    expect(createIsEnumPredicate(Demo)).toBeInstanceOf(Function);
  });

  it('Predicate function checks if input is a member of the enum', () => {
    const fn = createIsEnumPredicate(Demo);

    expect(fn(Demo.Demo)).toBeTruthy();
    expect(fn('Fail')).toBeFalsy();
  });
});

describe('createStringMatchingPredicate()', () => {
  const pattern = /.+/;

  it('Returns a type predicate function', () => {
    expect(createStringMatchingPredicate(pattern)).toBeInstanceOf(Function);
  });

  it('Predicate function checks if input is a member of the enum', () => {
    const fn = createStringMatchingPredicate(pattern);

    expect(fn('Test')).toBeTruthy();
    expect(fn('')).toBeFalsy();
    expect(fn(false)).toBeFalsy();
  });
});

describe('everyItem()', () => {
  it('Returns a type predicate function', () => {
    expect(everyItem(isBoolean)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(isBoolean) as unknown as typeof isBoolean;

    const fn = everyItem(predicate);

    expect(fn([true])).toBeTruthy();
    expect(fn([false])).toBeTruthy();
    expect(fn(['test'])).toBeFalsy();
    expect(fn(true)).toBeFalsy();
    expect(predicate).toHaveBeenCalledTimes(3);
  });
});

describe('maybeArray()', () => {
  it('Returns a type predicate function', () => {
    expect(maybeArray(isBoolean)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(isBoolean) as unknown as typeof isBoolean;

    const fn = maybeArray(predicate);

    expect(fn([true])).toBeTruthy();
    expect(fn([false])).toBeTruthy();
    expect(fn(true)).toBeTruthy();
    expect(predicate).toHaveBeenCalledTimes(3);
  });
});

describe('maybeNull()', () => {
  it('Returns a type predicate function', () => {
    expect(maybeNull(isBoolean)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(isBoolean) as unknown as typeof isBoolean;

    const fn = maybeNull(predicate);

    expect(fn(true)).toBeTruthy();
    expect(fn(null)).toBeTruthy();
    expect(fn(false)).toBeTruthy();
    expect(predicate).toHaveBeenCalledTimes(2);
  });
});

describe('maybeUndefined()', () => {
  it('Returns a type predicate function', () => {
    expect(maybeUndefined(isBoolean)).toBeInstanceOf(Function);
  });

  it('Calls a type predicate function', () => {
    const predicate = vi.fn(isBoolean) as unknown as typeof isBoolean;

    const fn = maybeUndefined(predicate);

    expect(fn(true)).toBeTruthy();
    expect(fn(undefined)).toBeTruthy();
    expect(fn(false)).toBeTruthy();
    expect(predicate).toHaveBeenCalledTimes(2);
  });
});
