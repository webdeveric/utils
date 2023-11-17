/* eslint-disable @typescript-eslint/no-explicit-any */
export type IfCommonKeys<Target, Source, T, F> = IfNever<keyof (Target | Source), F, T>;

export type IfDefined<T, D, U> = undefined extends T ? U : D;

export type IfNever<T, N, O> = [T] extends [never] ? N : O;

export type CanBeUndefined<Type, T, F> = Type | undefined extends Type ? T : F;

export type ReturnTypeDefault<F, D = undefined> = F extends (...args: any) => infer R ? R : D;

export type DeepNonNullable<T> = T extends Record<PropertyKey, unknown>
  ? {
      [P in keyof T]: DeepNonNullable<T[P]>;
    }
  : NonNullable<T>;

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type Unwritable<T> = T extends Writable<infer Inner> ? Readonly<Inner> : Readonly<T>;

export type GetIndex<T> = {
  [K in keyof T as symbol extends K ? K : string extends K ? K : number extends K ? K : never]: T[K];
};

export type AllOrNone<T> = T | { [K in keyof T]?: never };

export type OptionalExcept<T, K extends keyof T> = T extends any ? Partial<Omit<T, K>> & Pick<T, K> : never;

export type NonVoid<T> = T extends void ? never : T;

/**
 * Return a list of keys where the property value match the `DataType`.
 */
export type KeysWhere<Type, DataType, Key extends keyof Type = keyof Type> = Key extends PropertyKey
  ? DataType extends Type[Key]
    ? Key
    : never
  : never;

/**
 * Construct a type where all the property values match the `DataType`.
 */
export type PickByType<Type, DataType> = {
  [Property in KeysWhere<Type, DataType>]: Type[Property];
};

export type StringKeys<T> = keyof T & string;

export type Values<Type> = Type[keyof Type];
