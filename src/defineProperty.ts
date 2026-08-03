import type {
  ApplyPropertyAttribute,
  GetPropertyRecordFromAttribute,
  PropertyAttribute,
  RetainMutability,
} from './types/objects.js';
import type { Pretty } from './types/utils.js';

export type WithProperty<Type, Property extends PropertyKey, Attribute extends PropertyAttribute> = Omit<
  Type,
  Property
> &
  ApplyPropertyAttribute<
    GetPropertyRecordFromAttribute<Type, Property, Attribute>,
    Attribute,
    RetainMutability<Type, Property>
  >;

/**
 * Type-safe wrapper around `Object.defineProperty` that reflects the new property in the returned type.
 *
 * @example
 * ```ts
 * const user = defineProperty({ name: 'Test' }, 'age', { value: 42 });
 * // user: { name: string, readonly age: number }
 * ```
 *
 * ```ts
 * const user = defineProperty({ name: 'Test' }, 'title', { writable: true });
 * // user: { name: string, title: unknown }
 * ```
 */
export function defineProperty<Type, Property extends PropertyKey, Attributes extends PropertyAttribute>(
  input: Type,
  property: Property,
  attributes: Attributes,
): Pretty<WithProperty<Type, Property, Attributes>> {
  return Object.defineProperty(input, property, attributes) as WithProperty<Type, Property, Attributes>;
}
