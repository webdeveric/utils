import { trimEnd } from './trimEnd.js';
import { trimStart } from './trimStart.js';

export function joinStrings(left: string, right: string, separator = '/'): string {
  return trimEnd(left, separator) + separator + trimStart(right, separator);
}
