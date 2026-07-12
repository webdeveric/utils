/**
 * Determine if `input` looks like a URL.
 *
 * @example
 * ```ts
 * looksLikeURL('https://example.com'); // true
 * looksLikeURL('not a url'); // false
 * ```
 */
// eslint-disable-next-line no-control-regex
export const looksLikeURL = (input: string): boolean => /^[\x00-\x7F]+:\/\/.+/.test(input);
