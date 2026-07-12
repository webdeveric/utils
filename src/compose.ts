export type ComposeFn<T, A extends unknown[], R = T> = ((data: T) => R) | ((data: T, ...args: A) => R);

/**
 * Compose `functions` into a single function that pipes data through each of them in order.
 *
 * @example
 * ```ts
 * const addOne = (n: number) => n + 1;
 * const double = (n: number) => n * 2;
 *
 * compose(addOne, double)(3); // 8
 * ```
 */
export function compose<T, A extends unknown[]>(...functions: ComposeFn<T, A, T | void>[]): ComposeFn<T, A> {
  return functions.reduce<ComposeFn<T, A>>(
    (prev, next) =>
      (data: T, ...args: A): T => {
        const updatedData = prev(data, ...args);

        return (next(updatedData, ...args) ?? updatedData) as T;
      },
    (data: T) => data,
  );
}
