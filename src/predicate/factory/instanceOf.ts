import type { AnyNewable } from '../../types/common.js';
import type { TypePredicateFn } from '../../types/functions.js';

export const instanceOf =
  <T extends AnyNewable>(constructor: T): TypePredicateFn<InstanceType<T>> =>
  (input: unknown): input is InstanceType<T> =>
    input instanceof constructor;
