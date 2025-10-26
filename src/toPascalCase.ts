import { capitalize } from './capitalize.js';

import type { StringRecord } from './types/records.js';
import type { PascalCase } from './types/strings.js';
import type { KeyValueTuple } from './types/tuples.js';

export function toPascalCase<Type extends string>(text: Type, customWords?: StringRecord): PascalCase<Type> {
  let words: string[] = String(text)
    .replaceAll(/['.]/g, '')
    .replaceAll(/[^a-z0-9]/gi, ' ')
    .split(/(\s+)|(?<=\d)(?=[a-z])|(?<=[a-z])(?=\d)/i)
    .filter((word: string | undefined) => word?.trim().length)
    .map(capitalize);

  if (words && customWords && typeof customWords === 'object') {
    const replacements = new Map(
      Object.entries(customWords).map<KeyValueTuple<string, string>>(([key, value]) => [key.toLowerCase(), value]),
    );

    if (replacements.size) {
      // This takes a single word and returns the first matching replacement, if any.
      const replaceCustomWords = (word: string): string => replacements.get(word.toLowerCase()) ?? word;

      words = words.map(replaceCustomWords);
    }
  }

  return words.join('') as PascalCase<Type>;
}
