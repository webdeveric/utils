import { getType } from './getType.js';
import { isNumericString } from './type-predicate.js';
import { looksLikeURL } from './looksLikeURL.js';

export const describeInput = (input: unknown): string => {
  switch (typeof input) {
    case 'string':
      {
        if (isNumericString(input)) {
          return 'Numeric String';
        }

        const tokenMatch = input.match(/^(Basic|Bearer)\s.+/i);

        if (tokenMatch) {
          const tokenType = tokenMatch.at(1);

          if (tokenType) {
            return tokenType;
          }
        }

        if (looksLikeURL(input)) {
          try {
            const url = new URL(input);

            return `${url.protocol.replace(':', '')} URL${url.username || url.password ? ' with credentials' : ''}`;
          } catch (error) {
            return 'Invalid URL';
          }
        }
      }
      break;
    case 'number':
      if (input === Infinity) {
        return 'Infinity';
      }

      if (input === -Infinity) {
        return 'Negative Infinity';
      }

      if (Number.isInteger(input)) {
        return 'Integer';
      }

      if (Number.isFinite(input)) {
        return 'Number';
      }

      if (Number.isNaN(input)) {
        return 'NaN';
      }
  }

  return getType(input);
};
