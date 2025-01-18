import type { StripWhitespace } from './types/strings.js';

export const stripWhitespace = <T extends string>(input: T): StripWhitespace<T> =>
  input.replace(/\s+/g, '') as StripWhitespace<T>;
