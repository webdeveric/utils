/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator
 */
export const isAsyncIterable = (input: unknown): input is AsyncIterable<unknown> => {
  return (
    input !== null &&
    typeof input === 'object' &&
    Symbol.asyncIterator in input &&
    typeof input[Symbol.asyncIterator] === 'function'
  );
};
