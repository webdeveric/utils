import { beforeEach, describe, it, expect, vi } from 'vitest';

import { delay } from '../src/delay.js';

describe('delay()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('Delays by some number of milliseconds', async () => {
    const tenSecondDelay = delay(10_000);

    vi.runOnlyPendingTimers();

    await expect(tenSecondDelay).resolves.toBeUndefined();
  });

  it('Specifies the return value', async () => {
    const tenSecondDelay = delay(10_000, 'value');

    vi.runOnlyPendingTimers();

    await expect(tenSecondDelay).resolves.toBe('value');
  });

  it('Rejects when provided invalid milliseconds', async () => {
    await expect(delay('wrong milliseconds value' as unknown as number)).rejects.toThrow();
  });
});
