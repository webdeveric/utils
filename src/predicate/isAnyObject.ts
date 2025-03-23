/**
 * Determine if `input` is any non-null object.
 */
export const isAnyObject = (input: unknown): input is object => input !== null && typeof input === 'object';
