import type { TypeOf, TypeOfMapping } from '../../types/common.js';

export const typeOf =
  <T extends TypeOf>(...types: T[]) =>
  <Input>(input: Input): input is Input & TypeOfMapping[T] =>
    types.some((type) => typeof input === type);
