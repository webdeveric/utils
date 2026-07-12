export function delayAnimationFrame(): Promise<undefined>;

export function delayAnimationFrame<T>(value: T): Promise<T>;

/**
 * Return a Promise that resolves with `value` on the next animation frame.
 *
 * @example
 * ```ts
 * await delayAnimationFrame(); // resolves with `undefined` on the next animation frame
 * await delayAnimationFrame('done'); // resolves with 'done' on the next animation frame
 * ```
 */
export function delayAnimationFrame<T>(value?: T): Promise<typeof value> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve(value));
  });
}
