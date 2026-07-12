/**
 * Determine if `input` is a string that `URL.canParse()` accepts as a valid URL.
 *
 * @example
 * ```ts
 * isUrlString('https://example.com'); // true
 * isUrlString('not a url'); // false
 * ```
 */
export const isUrlString = (input: unknown): input is string => {
  return typeof input === 'string' && URL.canParse(input);
};
