import type { TypeAssertionFn } from './types/functions.js';

export type JsonReviver = Parameters<JSON['parse']>[1];

export function jsonParse(input: string, reviver?: JsonReviver): unknown;

export function jsonParse<T>(input: string, reviver: JsonReviver | undefined, assertionFn: TypeAssertionFn<T>): T;

/**
 * Parse `input` as JSON, optionally asserting the parsed value's type with `assertionFn`.
 *
 * @example
 * ```ts
 * jsonParse('{"a":1}'); // { a: 1 }
 * ```
 */
export function jsonParse<T>(input: string, reviver?: JsonReviver, assertionFn?: TypeAssertionFn<T>): unknown {
  const data: unknown = JSON.parse(input, reviver);

  assertionFn?.(data);

  return data;
}
