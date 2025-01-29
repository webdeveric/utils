export const isNonNullable = <T>(input: T): input is NonNullable<T> => typeof input !== 'undefined' && input !== null;
