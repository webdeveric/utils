/**
 * Create a property descriptor that lazily computes its value.
 *
 * @example
 * ```ts
 * const data = {};
 *
 * Object.defineProperty(data, 'value', lazyProp('value', () => {
 *   return Math.random();
 * }));
 * ```
 */
export function lazyProp<Key extends PropertyKey, Value>(
  key: Key,
  getter: () => Value,
): TypedPropertyDescriptor<Value> {
  return {
    configurable: true,
    get() {
      const value = getter();

      Object.defineProperty(this, key, {
        value,
        writable: true,
        configurable: true,
      });

      return value;
    },
  };
}
