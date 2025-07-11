import { pathParts } from './pathParts.js';

import type { Path, PathValue } from './types/objects.js';

export function get<Input extends object, const InputPath extends Path<Input>>(
  input: Input,
  path: InputPath,
): PathValue<Input, InputPath>;

export function get<const Input extends object, const InputPath extends string>(input: Input, path: InputPath): unknown;

export function get<const Input extends object, const InputPath extends Path<Input> | string>(
  input: Input,
  path: InputPath,
): unknown {
  if (path === '') {
    return input;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = input;

  for (const part of pathParts(path)) {
    if (typeof current === 'object' && current !== null && part in current) {
      current = current[part];
    } else {
      return;
    }
  }

  return current;
}
