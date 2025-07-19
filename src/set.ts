import { pathParts } from './pathParts.js';

import type { Path, PathValue } from './types/objects.js';

/**
 * Set the value of a property
 */
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

export function set<Input extends object, InputPath extends Path<Input> | string, Value>(
  input: Input,
  path: InputPath,
  value: Value,
): Value {
  if (path === '') {
    throw new Error('Path cannot be an empty string');
  }

  if (typeof path === 'string' && /\b(__proto__|constructor|prototype)\b/.test(path)) {
    throw new Error('Cannot pollute prototype');
  }

  const parts = Array.from(pathParts(path));

  const lastPart = parts.pop();

  if (typeof lastPart === 'undefined') {
    throw new Error('Path must have at least one part');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = input;

  const useParts: PropertyKey[] = [];

  // get a reference to the last node that will be updated
  for (const part of parts) {
    useParts.push(part);

    if (typeof current === 'object' && current !== null && part in current) {
      current = current[part];
    } else {
      throw new Error(`Path "${useParts.join('.')}" does not exist in the input object`);
    }
  }

  return (current[lastPart] = value);
}
