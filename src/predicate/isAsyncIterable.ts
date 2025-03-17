export const isAsyncIterable = <T>(input: unknown): input is AsyncIterable<T> => {
  return (
    input !== null &&
    typeof input === 'object' &&
    Symbol.asyncIterator in input &&
    typeof input[Symbol.asyncIterator] === 'function'
  );
};
