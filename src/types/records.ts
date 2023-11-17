/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyRecord = Record<PropertyKey, any>;

export type UnknownRecord = Record<PropertyKey, unknown>;

export type NeverRecord = Record<PropertyKey, never>;

export type StringRecord = Record<string, string>;

export type RemoveIndex<T> = {
  [K in keyof T as symbol extends K ? never : string extends K ? never : number extends K ? never : K]: T[K];
};

export type StringPropertyKeys<Data extends UnknownRecord> = Extract<keyof RemoveIndex<Data>, string>;

export type LowercaseProperties<Type extends UnknownRecord> = {
  [Property in keyof Type as Lowercase<Extract<Property, string>>]: Type[Property];
} & Omit<Type, StringPropertyKeys<Type>>;

export type PartialKeys<T, K extends keyof T> = T extends any ? Omit<T, K> & Partial<Pick<T, K>> : never;

export type OnlyOne<Type extends UnknownRecord> = {
  [Property in keyof Type]: Omit<Type, Property> & Partial<NeverRecord>;
}[keyof Type];

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
