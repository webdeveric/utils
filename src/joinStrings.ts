import { trimEnd } from './trimEnd';
import { trimStart } from './trimStart';

export function joinStrings(left: string, right: string, separator = '/'): string {
  return trimEnd(left, separator) + separator + trimStart(right, separator);
}
