export const isIterable = <T>(input: unknown): input is Iterable<T> => {
  return (
    input !== null &&
    typeof input === 'object' &&
    Symbol.iterator in input &&
    typeof input[Symbol.iterator] === 'function'
  );
};
