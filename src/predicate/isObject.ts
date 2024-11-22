/**
 * Determine if `input` is an object and not null or an array.
 */
export const isObject = (input: unknown): input is object =>
  input !== null && typeof input === 'object' && !Array.isArray(input);
