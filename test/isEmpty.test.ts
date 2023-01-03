import { describe, it, expect } from 'vitest';

import { isEmpty } from '../src/isEmpty';

describe('isEmpty()', () => {
  it('Returns true for empty values', () => {
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
    expect(isEmpty(new Set())).toBeTruthy();
    expect(isEmpty(new Map())).toBeTruthy();
    expect(isEmpty({ length: 0 })).toBeTruthy();
  });

  it('Returns false for non-empty values', () => {
    expect(isEmpty('test')).toBeFalsy();
    expect(isEmpty(['test'])).toBeFalsy();
    expect(isEmpty({ test: true })).toBeFalsy();
    expect(isEmpty({ [Symbol('test')]: true })).toBeFalsy();
    expect(isEmpty(0)).toBeFalsy();
    expect(isEmpty(Math.PI)).toBeFalsy();
    expect(isEmpty(new Set(['test']))).toBeFalsy();
    expect(isEmpty(new Map([['test', true]]))).toBeFalsy();
    expect(isEmpty({ length: 10 })).toBeFalsy();
  });
});
