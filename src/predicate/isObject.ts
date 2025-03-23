/**
 * Determine if `input` is a non-null object and not an array.
 */
export const isObject = (input: unknown): input is object =>
  input !== null && typeof input === 'object' && !Array.isArray(input);
