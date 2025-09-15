import { describe, expect, it } from 'vitest';

import { byLocaleCompare } from '../../../src/sort/byLocaleCompare.js';
import { byReverseOf } from '../../../src/sort/factory/byReverseOf.js';

describe('byReverseOf()', () => {
  it('returns a CompareFn', () => {
    expect(byReverseOf(byLocaleCompare)).instanceOf(Function);
  });

  it('Sorts using the returned CompareFn', () => {
    expect(['a', 'b', 'c'].sort(byReverseOf(byLocaleCompare))).toEqual(['c', 'b', 'a']);
  });
});
