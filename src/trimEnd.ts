import { escapeRegExp } from './escapeRegExp.js';

/**
 * Remove `char` from the end of `str`, or whitespace if `char` isn't provided.
 *
 * @example
 * ```ts
 * trimEnd('hello   '); // 'hello'
 * trimEnd('hello///', '/'); // 'hello'
 * ```
 */
export function trimEnd(str: string, char?: string): string {
  return char ? str.replace(new RegExp(`${escapeRegExp(char)}+$`), '') : str.trimEnd();
}
