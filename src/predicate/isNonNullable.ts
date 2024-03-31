export const isNonNullable = <T>(input: unknown): input is NonNullable<T> =>
  typeof input !== 'undefined' && input !== null;
