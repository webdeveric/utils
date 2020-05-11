export function toPascalCase(text, customWords)
{
  let words = String(text).match( /[A-Z][a-z']+|\d+|[a-z']+/g );

  if ( ! words ) {
    return '';
  }

  // Uppercase the first letter of each word and replace apostrophe.
  words = words.map( w =>  w.substr(0, 1).toUpperCase() + w.substr(1).replace('\'', '') );

  if ( Object.prototype.toString.call( customWords ) === '[object Object]' ) {
    const replacements = Object.entries( customWords ).map(([ key, value ]) => [
      key.toLowerCase(),
      value,
    ]);

    if ( replacements.length ) {
      // This takes a single word and returns the first matching replacement, if any.
      const replaceCustomWords = word => {
        const lowerWord = word.toLowerCase();

        for (const [ key, value ] of replacements) {
          if (key === lowerWord) {
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
