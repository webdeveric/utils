import { describe, it, expect } from 'vitest';

import { assertPathExists } from '../../src/assertion/assertPathExists.js';
import { isNumber } from '../../src/predicate/isNumber.js';
import { isString } from '../../src/predicate/isString.js';

describe('assertPathExists()', () => {
  it('Throws when path does not exist on object', () => {
    expect(() => {
      assertPathExists({ name: 'Test' }, 'name');
    }).not.toThrowError();

    expect(() => {
      assertPathExists({ name: 'Test' }, 'age');
    }).toThrowError();
  });

  it('Throws when path does not pass predicate validation', () => {
    expect(() => {
      assertPathExists({ name: 'Test' }, 'name', isString);
    }).not.toThrowError();

    expect(() => {
      assertPathExists({ name: 'Test' }, 'name', isNumber);
    }).toThrowError();
  });
});
