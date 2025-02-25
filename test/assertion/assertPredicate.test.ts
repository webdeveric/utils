import { AssertionError } from 'node:assert';

import { describe, it, expect } from 'vitest';

import { assertPredicate } from '../../src/assertion/assertPredicate.js';
import { isInteger } from '../../src/predicate/isInteger.js';

describe('assertPredicate', () => {
  it('asserts that the input satisfies the predicate', () => {
    expect(() => {
      assertPredicate(1, isInteger);
    }).not.toThrow();

    expect(() => {
      assertPredicate('test', isInteger);
    }).toThrow();
  });

  it('Can customize the error', () => {
    expect(() => {
      assertPredicate('test', isInteger, 'input is not an integer');
    }).toThrow('input is not an integer');

    expect(() => {
      assertPredicate('test', isInteger, new Error('input is not an integer'));
    }).toThrow('input is not an integer');

    expect(() => {
      assertPredicate(
        'test',
        isInteger,
        (input) => new AssertionError({ message: 'input is not an integer', actual: input }),
      );
    }).toThrowError(AssertionError);
  });
});
