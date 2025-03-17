import type { TypePredicateFn } from '../../types/functions.js';

export const literal =
  <const Type>(value: Type): TypePredicateFn<Type> =>
  (input: unknown): input is Type =>
    input === value;
