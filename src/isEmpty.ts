import { isLengthAware } from './predicate/isLengthAware.js';

export function isEmpty(input: unknown): boolean {
  if (typeof input === 'undefined' || input === null || (typeof input === 'string' && !input.length)) {
    return true;
  }

  if (input instanceof Set || input instanceof Map) {
    return input.size === 0;
  }

  if (isLengthAware(input)) {
    return input.length === 0;
  }

  if (typeof input === 'object') {
    return Object.getOwnPropertyNames(input).length === 0 && Object.getOwnPropertySymbols(input).length === 0;
  }

  return false;
}
