import escapeRegExp from 'lodash.escaperegexp';

export function trimStart(str: string, char?: string): string {
  return char ? str.replace(new RegExp(`^${escapeRegExp(char)}+`), '') : str.trimStart();
}
