import type {
  ApplyPropertyAttribute,
  GetPropertyRecordFromAttribute,
  PropertyAttributeMap,
  RetainMutability,
} from './types/objects.js';
import type { Pretty, UnionToIntersection } from './types/utils.js';

export type WithPropertyMap<Type, AttributeMap extends PropertyAttributeMap> = Omit<Type, keyof AttributeMap> &
  UnionToIntersection<
    {
      [Property in keyof AttributeMap]: ApplyPropertyAttribute<
        GetPropertyRecordFromAttribute<Type, Property, AttributeMap[Property]>,
        AttributeMap[Property],
        RetainMutability<Type, Property>
      >;
    }[keyof AttributeMap]
  >;

/**
 * Type-safe wrapper around `Object.defineProperties()` that reflects the new properties in the returned type.
 *
 * @example
 * ```ts
 * const user = defineProperties({ name: 'Test' }, {
 *   age: { value: 42 },
 *   isAdmin: { get: () => false },
 *   title: {
 *     writable: true,
 *   },
 * });
 * // user: { name: string, readonly age: number, readonly isAdmin: boolean, title: unknown }
 * ```
 */
export function defineProperties<Type, AttributeMap extends PropertyAttributeMap>(
  input: Type,
  attributeMap: AttributeMap,
): Pretty<WithPropertyMap<Type, AttributeMap>> {
  return Object.defineProperties(input, attributeMap) as WithPropertyMap<Type, AttributeMap>;
}
