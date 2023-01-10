import { describe, expect, it } from 'vitest';

import { byProperty, byReverseOf } from '../src/sort-factory.js';
import { byLocaleCompare } from '../src/sort.js';

describe('byProperty()', () => {
  it('returns a CompareFn', () => {
    expect(byProperty<{ name: string }>(() => 0, 'name')).instanceOf(Function);
  });

  it('Sorts using the returned CompareFn', () => {
    expect(
      [
        {
          name: 'b',
        },
        {
          name: 'a',
        },
      ].sort(byProperty(byLocaleCompare, 'name')),
    ).toEqual([
      {
        name: 'a',
      },
      {
        name: 'b',
      },
    ]);
  });
});

describe('byReverseOf()', () => {
  it('returns a CompareFn', () => {
    expect(byReverseOf(byLocaleCompare)).instanceOf(Function);
  });

  it('Sorts using the returned CompareFn', () => {
    expect(['a', 'b', 'c'].sort(byReverseOf(byLocaleCompare))).toEqual(['c', 'b', 'a']);
  });
});
