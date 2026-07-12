import { escapeRegExp } from './escapeRegExp.js';

/**
 * Remove `char` from the start of `str`, or whitespace if `char` isn't provided.
 *
 * @example
 * ```ts
 * trimStart('   hello'); // 'hello'
 * trimStart('///hello', '/'); // 'hello'
 * ```
 */
export function trimStart(str: string, char?: string): string {
  return char ? str.replace(new RegExp(`^${escapeRegExp(char)}+`), '') : str.trimStart();
}
