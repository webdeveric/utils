import type { Branded } from './branded.js';

export type Int32 = Branded<number, 'Int32'>;

export type NumberRange =
  | [min: number]
  | [min: number, max: undefined]
  | [min: number, max: number]
  | [min: undefined, max: number];
