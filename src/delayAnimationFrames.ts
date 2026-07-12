export function delayAnimationFrames(frames: number): Promise<undefined>;

export function delayAnimationFrames<T>(frames: number, value: T): Promise<T>;

/**
 * Return a Promise that resolves with `value` after the given number of animation `frames` have elapsed.
 *
 * @example
 * ```ts
 * await delayAnimationFrames(5); // resolves with `undefined` after 5 animation frames
 * await delayAnimationFrames(5, 'done'); // resolves with 'done' after 5 animation frames
 * ```
 */
export function delayAnimationFrames<T>(frames: number, value?: T): Promise<typeof value> {
  return new Promise((resolve, reject) => {
    if (!Number.isInteger(frames) || frames < 1) {
      reject(new TypeError('frames must be a positive integer'));

      return;
    }

    const loop = (frame: number): void => {
      if (frame === 0) {
        resolve(value);

        return;
      }

      window.requestAnimationFrame(() => loop(frame - 1));
    };

    loop(frames);
  });
}
