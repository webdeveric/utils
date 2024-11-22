/**
 * Delay a specified number of milliseconds before resolving.
 *
 * The `ms` value can be between zero and the max delay value for `setTimeout()`, which is `2 ** 31 - 1`.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value}
 */
export function delay(milliseconds: number): Promise<undefined>;

export function delay<T>(milliseconds: number, value: T): Promise<T>;

export function delay<T>(milliseconds: number, value?: T): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const maxDelayMs = 2 ** 31 - 1;

    if (typeof milliseconds !== 'number' || milliseconds < 0 || milliseconds > maxDelayMs) {
      reject(new TypeError(`milliseconds must be a number between 0 and ${maxDelayMs}`));

      return;
    }

    setTimeout(resolve, milliseconds, value);
  });
}
