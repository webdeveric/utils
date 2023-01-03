import { getType } from './getType.js';
import { looksLikeURL } from './looksLikeURL.js';
import { isNumericString } from './type-predicate.js';

export const describeInput = (input: unknown): string => {
  switch (typeof input) {
    case 'string':
      {
        if (isNumericString(input)) {
          return 'Numeric String';
        }

        const tokenMatch = input.match(/^(Basic|Bearer)\s.+/i);

        if (Array.isArray(tokenMatch) && tokenMatch[1]) {
          return tokenMatch[1];
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
