// eslint-disable-next-line no-control-regex
export const looksLikeURL = (input: string): boolean => /^[\x00-\x7F]+:\/\/.+/.test(input);
