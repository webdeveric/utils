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
    await expect(delay(2 ** 32)).rejects.toThrow();
  });

  it('Rejects when aborted via AbortSignal', async () => {
    const controller = new AbortController();

    const promise = delay(10_000, controller.signal);

    controller.abort(new Error('Aborted'));

    await expect(promise).rejects.toThrow('Aborted');
  });

  it('Rejects with the abort reason when provided a value and an AbortSignal', async () => {
    const controller = new AbortController();

    const promise = delay(10_000, 'value', controller.signal);

    controller.abort(new Error('Aborted'));

    await expect(promise).rejects.toThrow('Aborted');
  });

  it('Resolves normally when the AbortSignal is not aborted', async () => {
    const controller = new AbortController();

    const promise = delay(10_000, controller.signal);

    vi.runOnlyPendingTimers();

    await expect(promise).resolves.toBeUndefined();
  });

  it('Rejects immediately when the AbortSignal is already aborted', async () => {
    const controller = new AbortController();

    controller.abort(new Error('Already aborted'));

    const promise = delay(10_000, controller.signal);

    await expect(promise).rejects.toThrow('Already aborted');
  });
});
