import type { TypePredicateFn } from '../types/functions.js';
import type { Pretty, Writable } from '../types/utils.js';

export const is =
  <const T extends unknown[]>(...options: T): TypePredicateFn<Pretty<Writable<T[number]>>> =>
  (input: unknown): input is T[number] =>
    options.some((option) => Object.is(input, option));
