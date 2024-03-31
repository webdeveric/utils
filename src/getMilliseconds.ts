import { isInteger } from './predicate/isInteger.js';

export const getMilliseconds = (input: string | number | Date): number =>
  input instanceof Date ? input.getTime() : isInteger(input) ? input : Date.parse(input);
