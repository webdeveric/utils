/**
 * Determine if `input` is an array.
 */
export const isArray = (input: unknown): input is unknown[] => Array.isArray(input);
