import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';

import { delayAnimationFrames } from '../src/delayAnimationFrames.js';

describe('delayAnimationFrames()', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 0));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('delays the specified number of times', async () => {
    const frameCount = 10;

    await expect(delayAnimationFrames(frameCount, 'value')).resolves.toBe('value');

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(frameCount);
  });

  it('Specifies the return value', async () => {
    const delay = delayAnimationFrames(1, true);

    await expect(delay).resolves.toBe(true);
  });

  it('Rejects when provided invalid frames value', async () => {
    expect.assertions(2);

    await expect(delayAnimationFrames(null as unknown as number)).rejects.toBeInstanceOf(Error);
    await expect(delayAnimationFrames(-1)).rejects.toBeInstanceOf(Error);
  });
});
