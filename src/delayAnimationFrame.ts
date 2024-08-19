export function delayAnimationFrame(): Promise<undefined>;

export function delayAnimationFrame<T>(value: T): Promise<T>;

export function delayAnimationFrame<T>(value?: T): Promise<typeof value> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve(value));
  });
}
