import { describe, it, expect } from 'vitest';

import { instanceOf } from '../../../src/index.js';
import { withSize } from '../../../src/predicate/factory/withSize.js';

describe('withSize()', () => {
  const twoItemSet = withSize(instanceOf(Set), 2);
  const isSetWithRange = withSize(instanceOf(Set), [1, 3]);

  it('Returns a type predicate function', () => {
    expect(twoItemSet).toBeInstanceOf(Function);
  });

  it('Throws when given an invalid range', () => {
    expect(() => {
      withSize(instanceOf(Set), [100, 1]);
    }).toThrowError();
  });

  it('Returns true for strings with the specified length', () => {
    expect(twoItemSet(new Set([0, 1]))).toBeTruthy();
  });

  it.each([new Set([0]), new Set([0, 1]), new Set([0, 1, 2])])(
    'Returns true for strings within the specified size range: %s',
    (input) => {
      expect(isSetWithRange(input)).toBeTruthy();
    },
  );

  it.each([new Set([0]), new Set([0, 1, 2]), true, null, 123])(
    'Returns false for inputs with wrong lengths: %s',
    (input) => {
      expect(twoItemSet(input)).toBeFalsy();
    },
  );

  it.each([new Set(), new Set([0, 1, 2, 3]), 'test', true, null, 123])(
    'Returns false for inputs outside the specified range: %s',
    (input) => {
      expect(isSetWithRange(input)).toBeFalsy();
    },
  );
});
