import { capitalize } from './capitalize.js';

import type { StringRecord } from './types/records.js';
import type { PascalCase } from './types/strings.js';
import type { KeyValueTuple } from './types/tuples.js';

export function toPascalCase<Type extends string>(text: Type, customWords?: StringRecord): PascalCase<Type> {
  const words = String(text).match(/[A-Z][a-z']*|[a-z']+|\d+|[A-Z]+(?![a-z])/g);

  let fixedWords = words?.map<string>((word) => capitalize(word.replace(/'/g, '')));

  if (fixedWords && customWords && typeof customWords === 'object') {
    const replacements = new Map(
      Object.entries(customWords).map<KeyValueTuple<string, string>>(([key, value]) => [key.toLowerCase(), value]),
    );

    if (replacements.size) {
      // This takes a single word and returns the first matching replacement, if any.
      const replaceCustomWords = (word: string): string => replacements.get(word.toLowerCase()) ?? word;

      fixedWords = fixedWords.map(replaceCustomWords);
    }
  }

  return (fixedWords ? fixedWords.join('') : '') as PascalCase<Type>;
}
