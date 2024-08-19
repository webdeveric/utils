import { describe, it, expect, vi } from 'vitest';

import { compose } from '../src/compose.js';

describe('compose()', () => {
  it('composes functions into one', async () => {
    const fn1 = vi.fn((data) => data);
    const fn2 = vi.fn(() => undefined);
    const fn3 = vi.fn(() => null);
    const fn4 = vi.fn((data) => data.toUpperCase());

    const composed = compose(fn1, fn2, fn3, fn4);

    expect(composed('composed')).toBe('COMPOSED');
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(fn3).toHaveBeenCalled();
    expect(fn4).toHaveBeenCalled();
  });
});
