import escapeRegExp from 'lodash.escaperegexp';

export function trimEnd(str: string, char?: string): string {
  return char ? str.replace(new RegExp(`${escapeRegExp(char)}+$`), '') : str.trimEnd();
}
