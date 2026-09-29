import { assertIsObject } from './assertion/assertIsObject.js';
import { getNode } from './internal/getNode.js';
import { pathParts } from './pathParts.js';

import type { Path, PathValue } from './types/objects.js';

const prototypePollutionPattern = /\b(__proto__|constructor|prototype)\b/;

export function set<Input extends object, InputPath extends Path<Input>, Value extends PathValue<Input, InputPath>>(
  input: Input,
  path: InputPath,
  value: Value,
): Value;

export function set<Input extends object, InputPath extends string, Value>(
  input: Input,
  path: InputPath,
  value: Value,
): Value;

/**
 * Set the value of a property
 *
 * @example
 * ```ts
 * const data = { a: { b: 1 } };
 *
 * set(data, 'a.b', 2); // 2
 * data; // { a: { b: 2 } }
 * ```
 */
export function set<Input extends object, InputPath extends Path<Input> | string, Value>(
  input: Input,
  path: InputPath,
  value: Value,
): Value {
  if (path === '') {
    throw new Error('Path cannot be an empty string');
  }

  if (typeof path === 'string' && prototypePollutionPattern.test(path)) {
    throw new Error('Cannot pollute prototype');
  }

  const parts = Array.from(pathParts(path));

  const lastPart = parts.pop();

  if (typeof lastPart === 'undefined') {
    throw new Error('Path must have at least one part');
  }

  const result = getNode(input, parts);

  if (!result.found) {
    throw new Error(`Path "${result.visitedNodes.join('.')}" does not exist in the input object`);
  }

  assertIsObject(result.value);

  return (result.value[lastPart] = value);
}
