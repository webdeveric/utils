import { getType } from './getType.js';

export function toPascalCase(text: string, customWords?: Record<string, string>): string {
  let words = String(text).match(/[A-Z][a-z']+|\d+|[a-z']+/g);

  if (!words) {
    return '';
  }

  // Remove apostrophes then uppercase the first letter of each word.
  words = words.map(word => {
    const fixedWord = word.replace(/'/g, '');

    return fixedWord.substring(0, 1).toUpperCase() + fixedWord.substring(1);
  });

  if (customWords && getType(customWords) === 'Object') {
    const replacements = Object.entries(customWords).map(([key, value]) => [key.toLowerCase(), value]);

    if (replacements.length) {
      // This takes a single word and returns the first matching replacement, if any.
      const replaceCustomWords = (word: string): string => {
        const lowerWord = word.toLowerCase();

        for (const [key, value] of replacements) {
          if (key === lowerWord && typeof value === 'string') {
            return value;
          }
        }

        return word;
      };

      words = words.map(replaceCustomWords);
    }
  }

  return words.join('');
}
