import { describe, it, expect } from 'vitest';

import { isPromiseLike } from '../../src/predicate/isPromiseLike.js';

describe('isPromiseLike()', () => {
  it('Returns true for valid input', () => {
    expect(isPromiseLike(Promise.resolve())).toBeTruthy();

    const rejected = Promise.reject(new Error('test'));

    expect(isPromiseLike(rejected)).toBeTruthy();

    // Must catch to not cause unhandledRejection error
    rejected.catch(() => null);
  });
});
