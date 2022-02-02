import { isEmpty } from '../src/isEmpty';

describe('isEmpty()', () => {
  it('Returns true for empty values', () => {
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
  });

  it('Returns false for non-empty values', () => {
    expect(isEmpty('test')).toBeFalsy();
    expect(isEmpty([ 'test' ])).toBeFalsy();
    expect(isEmpty({ test: true })).toBeFalsy();
    expect(isEmpty(0)).toBeFalsy();
    expect(isEmpty(Math.PI)).toBeFalsy();
  });
});
