/**
 * Determine if the `input` object has properties other than the provided `knownProperties`.
 *
 * @example
 * ```ts
 * hasAdditionalProperties({ a: 1, b: 2 }, ['a']); // true
 * hasAdditionalProperties({ a: 1 }, ['a']); // false
 * ```
 */
export const hasAdditionalProperties = (input: object, knownProperties: PropertyKey[]): boolean => {
  const properties = Array.isArray(input) ? [...knownProperties.map(String), 'length'] : knownProperties;

  return !Reflect.ownKeys(input).every((key) => properties.includes(key));
};
