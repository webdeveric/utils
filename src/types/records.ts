/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyRecord = Record<PropertyKey, any>;

export type UnknownRecord = Record<PropertyKey, unknown>;

export type NeverRecord = Record<PropertyKey, never>;

export type StringRecord = Record<string, string>;

/**
 * This is an alternative to a TypeScript enum.
 *
 * It is useful for when you do not want reverse mapping of enum values to keys,
 */
export type EnumRecord<Key extends string = string, Value extends string | number = string | number> = Record<
  Key,
  Value
>;

export type RemoveIndex<Type> = {
  [Key in keyof Type as symbol extends Key
    ? never
    : string extends Key
      ? never
      : number extends Key
        ? never
        : Key]: Type[Key];
};

export type StringPropertyKeys<Type extends UnknownRecord> = Extract<keyof RemoveIndex<Type>, string>;

export type LowercaseProperties<Type extends UnknownRecord> = {
  [Property in keyof Type as Lowercase<Extract<Property, string>>]: Type[Property];
} & Omit<Type, StringPropertyKeys<Type>>;

export type OnlyOne<Type extends UnknownRecord> = {
  [Property in keyof Type]: Omit<Type, Property> & Partial<Record<Property, never>>;
}[keyof Type];

export type RequireAtLeastOne<Type, Keys extends keyof Type = keyof Type> = Pick<Type, Exclude<keyof Type, Keys>> &
  {
    [Key in Keys]-?: Required<Pick<Type, Key>> & Partial<Pick<Type, Exclude<Keys, Key>>>;
  }[Keys];
