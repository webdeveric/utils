/**
 * Determine if the `input` object has properties other than the provided `knownProperties`.
 */
export const hasAdditionalProperties = (input: object, knownProperties: PropertyKey[]): boolean => {
  const properties = Array.isArray(input) ? [...knownProperties.map(String), 'length'] : knownProperties;

  return !Reflect.ownKeys(input).every((key) => properties.includes(key));
};
