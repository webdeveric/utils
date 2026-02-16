import { getType } from './getType.js';
import { looksLikeURL } from './looksLikeURL.js';
import { isNumericString } from './predicate/isNumericString.js';

export const describeInput = (input: unknown): string => {
  switch (typeof input) {
    case 'boolean':
    case 'symbol':
      return input.toString();
    case 'function': {
      const args = /^(function\s*\w*)?(?<args>\([^)]*\))/.exec(input.toString())?.groups?.['args'];

      return `${input.name || 'anonymous'}${args}`;
    }
    case 'string':
      {
        if (isNumericString(input)) {
          return 'Numeric String';
        }

        const authType = /^(?<authType>Basic|Bearer)\s.+/i.exec(input)?.groups?.['authType'];

        if (authType) {
          return `${authType} Authorization`;
        }

        if (looksLikeURL(input)) {
          try {
            const url = new URL(input);

            return `${url.protocol.replace(':', '')} URL${url.username || url.password ? ' with credentials' : ''}`;
          } catch {
            return 'Invalid URL';
          }
        }
      }
      break;
    case 'number': {
      if (input === Number.POSITIVE_INFINITY) {
        return 'Positive Infinity';
      }

      if (input === Number.NEGATIVE_INFINITY) {
        return 'Negative Infinity';
      }

      if (Number.isSafeInteger(input)) {
        return 'Safe Integer';
      }

      if (Number.isInteger(input)) {
        return 'Integer';
      }

      if (Number.isFinite(input)) {
        return 'Finite Number';
      }

      if (Number.isNaN(input)) {
        return 'NaN';
      }
    }
  }

  return getType(input);
};
