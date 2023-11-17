import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';

import { delayAnimationFrame } from '../src/delayAnimationFrame.js';

describe('delayAnimationFrame()', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => setTimeout(cb, 0));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Delays one animation frame', async () => {
    const delay = delayAnimationFrame();

    await expect(delay).resolves.toBeUndefined();
  });

  it('Specifies the return value', async () => {
    const delay = delayAnimationFrame('value');

    await expect(delay).resolves.toBe('value');
  });
});
