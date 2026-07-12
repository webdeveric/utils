import type { JsonValue } from '../types/common.js';

/**
 * Determine if `input` has a `toJSON` method that accepts zero or one arguments.
 *
 * @example
 * ```ts
 * isJSONable(new Date()); // true
 * isJSONable({}); // false
 * ```
 */
export const isJSONable = (input: unknown): input is { toJSON: (key?: string) => JsonValue } => {
  return (
    input !== null &&
    typeof input === 'object' &&
    'toJSON' in input &&
    typeof input.toJSON === 'function' &&
    input.toJSON.length <= 1 // maybe uses the `key` argument
  );
};
