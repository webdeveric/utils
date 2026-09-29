import { getNode } from './internal/getNode.js';
import { pathParts } from './pathParts.js';

import type { Path, PathValue } from './types/objects.js';

export function get<Input extends object>(input: Input, path: ''): Input;

export function get<Input extends object, InputPath extends Path<Input>>(
  input: Input,
  path: InputPath,
): PathValue<Input, InputPath>;

export function get<Input extends object, InputPath extends PropertyKey>(input: Input, path: InputPath): unknown;

/**
 * Get the value at `path` within `input`.
 *
 * @example
 * ```ts
 * get({ a: { b: 1 } }, 'a.b'); // 1
 * ```
 */
export function get<Input extends object, InputPath extends Path<Input> | PropertyKey>(
  input: Input,
  path: InputPath,
): unknown {
  return path === '' ? input : getNode(input, pathParts(path)).value;
}
