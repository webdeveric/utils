import { describe, it, expect } from 'vitest';

import { getMaxValue } from '../src/getMaxValue.js';

describe('getMaxValue()', () => {
  it('Returns the minimum value', () => {
    expect(getMaxValue(1, 2, 3)).toBe(3);
    expect(getMaxValue('1', '2', '1000', '3')).toBe('1000');
    expect(getMaxValue(1000n, 10n, 500n)).toBe(1000n);
  });

  it('Throws when not given correct input', () => {
    expect(() => {
      getMaxValue(null as unknown as Parameters<typeof getMaxValue>[number]);
    }).toThrow();

    expect(() => {
      getMaxValue(...([] as unknown as Parameters<typeof getMaxValue>));
    }).toThrow();
  });
});
