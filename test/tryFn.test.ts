import { describe, it, expect } from 'vitest';

import { tryFn } from '../src/tryFn.js';

describe('tryFn()', () => {
  it('Returns a function', () => {
    const fn = tryFn(() => true);

    expect(fn).toBeTypeOf('function');
    expect(fn()).toBeTruthy();
  });

  it('Can customize the default value', () => {
    const fn = tryFn(() => {
      throw new Error();
    }, 'default value');

    expect(fn()).toEqual('default value');
  });
});
