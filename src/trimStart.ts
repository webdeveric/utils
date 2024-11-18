import { escapeRegExp } from './escapeRegExp.js';

export function trimStart(str: string, char?: string): string {
  return char ? str.replace(new RegExp(`^${escapeRegExp(char)}+`), '') : str.trimStart();
}
