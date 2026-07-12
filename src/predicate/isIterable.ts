/**
 * Determine if `input` is iterable.
 *
 * @example
 * ```ts
 * isIterable([1, 2, 3]); // true
 * isIterable({ a: 1 }); // false
 * ```
 */
export const isIterable = <T>(input: unknown): input is Iterable<T> => {
  return (
    input !== null &&
    typeof input === 'object' &&
    Symbol.iterator in input &&
    typeof input[Symbol.iterator] === 'function'
  );
};
