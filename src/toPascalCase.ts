import { capitalize } from './capitalize.js';
import { getType } from './getType.js';

import type { KeyValueTuple, StringRecord } from './types.js';

export function toPascalCase(text: string, customWords?: StringRecord): string {
  const words = String(text).match(/[A-Z][a-z']+|\d+|[a-z']+/g);

  if (words === null) {
    return '';
  }

  let fixedWords = words.map(word => capitalize(word.replace(/'/g, '')));

  if (customWords && getType(customWords) === 'Object') {
    const replacements = new Map(
      Object.entries(customWords).map<KeyValueTuple<string, string>>(([key, value]) => [key.toLowerCase(), value]),
    );

    if (replacements.size) {
      // This takes a single word and returns the first matching replacement, if any.
      const replaceCustomWords = (word: string): string => replacements.get(word.toLowerCase()) ?? word;

      fixedWords = fixedWords.map(replaceCustomWords);
    }
  }

  return fixedWords.join('');
}
