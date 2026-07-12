/**
 * Determine if `input` is an async iterable.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator}
 *
 * @example
 * ```ts
 * isAsyncIterable({ [Symbol.asyncIterator]() { return this; } }); // true
 * isAsyncIterable([1, 2, 3]); // false
 * ```
 */
export const isAsyncIterable = (input: unknown): input is AsyncIterable<unknown> => {
  return (
    input !== null &&
    typeof input === 'object' &&
    Symbol.asyncIterator in input &&
    typeof input[Symbol.asyncIterator] === 'function'
  );
};
