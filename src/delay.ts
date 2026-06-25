import { isPositiveInteger } from './predicate/isPositiveInteger.js';

const MAX_DELAY_MS = 2 ** 31 - 1;

/**
 * Delay a specified number of milliseconds before resolving.
 *
 * The `ms` value can be between zero and the max delay value for `setTimeout()`, which is `2 ** 31 - 1`.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value}
 */
export function delay(milliseconds: number, signal?: AbortSignal): Promise<undefined>;

export function delay<T>(milliseconds: number, value: T, signal?: AbortSignal): Promise<T>;

export function delay<T>(milliseconds: number, value?: T, signal?: AbortSignal): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    if (!isPositiveInteger(milliseconds)) {
      reject(new TypeError('milliseconds must be a positive integer'));

      return;
    }

    // `0` already checked above.
    if (milliseconds > MAX_DELAY_MS) {
      reject(new RangeError(`milliseconds must be between 0 and ${MAX_DELAY_MS}`));

      return;
    }

    const valueIsAbortSignal = value instanceof AbortSignal;

    const abortSignal = valueIsAbortSignal ? value : signal;

    const returnValue = valueIsAbortSignal ? undefined : value;

    if (abortSignal?.aborted) {
      reject(abortSignal.reason);

      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    if (abortSignal) {
      const onAbort = (): void => {
        clearTimeout(timer);
        reject(abortSignal.reason);
      };

      timer = setTimeout(() => {
        abortSignal.removeEventListener('abort', onAbort);
        resolve(returnValue);
      }, milliseconds);

      abortSignal.addEventListener('abort', onAbort, { once: true });
    } else {
      timer = setTimeout(resolve, milliseconds, returnValue);
    }
  });
}
