import { describe, it, expect } from 'vitest';

import { getMinValue } from '../src/getMinValue.js';

describe('getMinValue()', () => {
  it('Returns the minimum value', () => {
    expect(getMinValue(3, 2, 1)).toBe(1);
    expect(getMinValue('3', '2', '1')).toBe('1');
    expect(getMinValue(30n, 2n, 100n)).toBe(2n);
  });

  it('Throws when not given correct input', () => {
    expect(() => {
      getMinValue(null as unknown as Parameters<typeof getMinValue>[number]);
    }).toThrow();

    expect(() => {
      getMinValue(...([] as unknown as Parameters<typeof getMinValue>));
    }).toThrow();
  });
});
