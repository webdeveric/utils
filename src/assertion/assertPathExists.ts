import { get } from '../get.js';
import { has } from '../has.js';

import type { TypePredicateFn } from '../types/functions.js';
import type { WithPath } from '../types/objects.js';

export function assertPathExists<Input extends object, InputPath extends string | number>(
  input: Input,
  path: InputPath,
): asserts input is Input & WithPath<Input, InputPath>;

export function assertPathExists<Input extends object, InputPath extends string | number, Value>(
  input: Input,
  path: InputPath,
  predicate: TypePredicateFn<Value>,
): asserts input is Input & WithPath<Input, InputPath, Value>;

export function assertPathExists<Input extends object, InputPath extends string | number>(
  input: Input,
  path: InputPath,
  predicate?: TypePredicateFn<unknown>,
): asserts input is Input & WithPath<Input, InputPath> {
  if (!has(input, path)) {
    throw new Error(`object path (${path}) does not exist on input`);
  }

  if (predicate && !predicate(get(input, `${path}`))) {
    throw new Error(`object path (${path}) failed predicate check`);
  }
}
