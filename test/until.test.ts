import { describe, it, expect, vi } from 'vitest';

import { isDelay, until, type UntilCallback, type UntilContext, type UntilOptions } from '../src/until.js';

describe('isDelay()', () => {
  it('Returns true when given a Delay', () => {
    expect(isDelay(1)).toBeTruthy();
    expect(isDelay(() => 1)).toBeTruthy();
  });
});

describe('until()', () => {
  it('Waits until the callback resolves or rejects', async () => {
    const untilTrue = until((resolve) => resolve(true));

    await expect(untilTrue).resolves.toBeTruthy();
  });

  it('delay can be a callback that accepts a context', async () => {
    const mockFn = vi.fn((context) => context.callCount);
    const callLimit = 2;

    const untilTrue = until(
      (resolve, _reject, context) => {
        if (context.callCount === callLimit) {
          resolve(true);
        }
      },
      {
        delay: mockFn,
      },
    );

    await expect(untilTrue).resolves.toBeTruthy();

    expect(mockFn.mock.calls[0]).toHaveLength(1);

    expect(mockFn).toHaveBeenCalledTimes(callLimit - 1);
  });

  it('timeout can be a callback that accepts a context', async () => {
    const mockFn = vi.fn((context) => context.callCount);

    const willTimeout = until(() => {}, { delay: 1, timeout: mockFn });

    await expect(willTimeout).rejects.toBeInstanceOf(Error);

    expect(mockFn.mock.calls[0]).toHaveLength(1);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('Callback checks an external variable', async () => {
    let doSomething = false;

    setTimeout(() => {
      doSomething = true;
    }, 5);

    await expect(
      until(
        (resolve) => {
          if (doSomething) {
            resolve(true);
          }
        },
        { delay: 1, timeout: 100 },
      ),
    ).resolves.toBeTruthy();
  });

  it('Waits for some time to pass', async () => {
    function msFromNow(ms: number): () => boolean {
      const start = Date.now();

      return () => Date.now() - start >= ms;
    }

    const someTimeHasPassed = msFromNow(5);

    const callback = (resolve: (input: number) => void): void => {
      if (someTimeHasPassed()) {
        resolve(2);
      }
    };

    await expect(until(callback, { delay: 1 })).resolves.toBe(2);
  });

  it('Can timeout', async () => {
    await expect(until(() => {}, { delay: 1, timeout: 1 })).rejects.toBeInstanceOf(Error);
  });

  it('fn that throws will cause a rejection', async () => {
    await expect(
      until(
        () => {
          throw new Error('rejected');
        },
        { delay: 1, timeout: 1 },
      ),
    ).rejects.toBeInstanceOf(Error);

    await expect(
      until(
        () => {
          // eslint-disable-next-line no-throw-literal
          throw 'error';
        },
        { delay: 1, timeout: 1 },
      ),
    ).rejects.toBeInstanceOf(Error);
  });

  it('Will reject after options.callLimit is reached', async () => {
    const options = {
      delay: 1,
      callLimit: 3,
    };

    const results = until(() => {}, options);

    await expect(results).rejects.toBeInstanceOf(Error);
  });

  describe('Invalid arguments throw an error', () => {
    const cb = (resolve: (input: boolean) => void): void => resolve(true);

    it('fn must be a function', async () => {
      await expect(until('not a function' as unknown as UntilCallback<unknown>)).rejects.toThrow();
    });

    describe('options', () => {
      it('options must be an object or undefined', async () => {
        await expect(until(cb)).resolves.toBeTruthy();

        await expect(until(cb, { delay: 1 })).resolves.toBeTruthy();

        await expect(until(cb, null as unknown as UntilOptions)).rejects.toThrow();

        await expect(until(cb, false as unknown as UntilOptions)).rejects.toThrow();
      });

      it('options.delay must be a function or a number', async () => {
        await expect(until(cb, { delay: 1 })).resolves.toBeTruthy();

        await expect(until(cb, { delay: () => 1 })).resolves.toBeTruthy();

        await expect(until(cb, { delay: false as unknown as number })).rejects.toThrow();

        await expect(until(cb, { delay: 'not a number' as unknown as number })).rejects.toThrow();
      });

      it('options.timeout must be undefined, function, or number', async () => {
        await expect(until(cb, { delay: 1 })).resolves.toBeTruthy();

        await expect(until(cb, { delay: 1, timeout: 10 })).resolves.toBeTruthy();

        await expect(until(cb, { delay: 1, timeout: () => 10 })).resolves.toBeTruthy();

        await expect(until(cb, { delay: 1, timeout: null as unknown as number })).rejects.toThrow();

        await expect(until(cb, { delay: 1, timeout: false as unknown as number })).rejects.toThrow();

        await expect(until(cb, { delay: 1, timeout: 'not a number' as unknown as number })).rejects.toThrow();
      });

      it('options.callLimit must be undefined or number', async () => {
        await expect(until(cb, { delay: 1 })).resolves.toBeTruthy();

        await expect(until(cb, { delay: 1, callLimit: 2 })).resolves.toBeTruthy();

        await expect(until(cb, { delay: 1, callLimit: 'test' as unknown as number })).rejects.toBeInstanceOf(Error);
      });
    });
  });

  describe('context', () => {
    it('Keeps track of how many times the callback was called', async () => {
      const result = await until<UntilContext>(
        (resolve, _reject, context) => {
          if (context.callCount === 2) {
            resolve(context);
          }
        },
        { delay: 0, timeout: 10 },
      );

      expect(result.callCount).toBe(2);
    });

    it('Keeps track of the last time the callback was called', async () => {
      const result = await until<UntilContext>(
        (resolve, _reject, context) => {
          resolve(context);
        },
        { delay: 0, timeout: 10 },
      );

      expect(typeof result.lastCall).toBe('number');
    });

    it('Keeps track of arbitrary data', async () => {
      const result = await until<UntilContext>(
        (resolve, _reject, context) => {
          context.data['demo'] = true;
          resolve(context);
        },
        { delay: 0, timeout: 10 },
      );

      expect(result.data['demo']).toBeTruthy();
    });

    it('Keeps track of options', async () => {
      const options = {
        delay: 0,
        timeout: 10,
      };

      const contextOptions = await until((resolve, _reject, context) => {
        resolve(context.options);
      }, options);

      expect(contextOptions).toBe(options);
    });
  });
});
