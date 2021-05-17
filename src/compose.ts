export type ComposeFn<T, A extends unknown[], R = T> = ((data: T) => R) | ((data: T, ...args: A) => R);

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
