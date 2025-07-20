import { pathParts } from './pathParts.js';
import { isAnyObject } from './predicate/isAnyObject.js';

import type { FromPath, Merge, Path, PathValue } from './types/objects.js';
import type { IfNever, Pretty } from './types/utils.js';

/**
 * Determine if the path exists on an object.
 */
// Known path so the `Input` type is unchanged
export function has<Input extends object, InputPath extends Path<Input>>(input: Input, path: InputPath): input is Input;

// Unknown path so the `Input` type is extended
export function has<Input extends object, InputPath extends string | number>(
  input: Input,
  path: InputPath,
): input is Pretty<Input & Merge<Input, FromPath<InputPath, unknown>>>;

// Unknown input can be assume to match at least the shape the input path makes
export function has<InputPath extends string | number>(
  input: unknown,
  path: InputPath,
): input is FromPath<InputPath, unknown>;

export function has<Input extends object, InputPath extends Path<Input> | string | number>(
  input: Input,
  path: InputPath,
): input is Input & FromPath<InputPath, IfNever<PathValue<Input, InputPath>, unknown, PathValue<Input, InputPath>>> {
  if (!isAnyObject(input)) {
    return false;
  }

  if (path === '') {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = input;

  for (const part of pathParts(path)) {
    if (typeof current === 'object' && current !== null && part in current) {
      current = current[part];
    } else {
      return false;
    }
  }

  return true;
}
