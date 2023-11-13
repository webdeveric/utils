/* eslint-disable @typescript-eslint/no-explicit-any */
export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export type TypeOf = 'undefined' | 'object' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Builtin = Date | Error | Function | Primitive | RegExp;

export type AnyRecord = Record<PropertyKey, any>;

export type StringRecord = Record<string, string>;

export type UnknownRecord = Record<PropertyKey, unknown>;

export type NeverRecord = Record<PropertyKey, never>;

export type NumericString<T extends string | number = number> = `${T}` extends `${number}` ? `${T}` : never;

export type NumericValue = number | bigint | NumericString;

export type MaybePlural<T extends string> = T | `${T}s`;

export type MaybePromise<T> = T | Promise<T>;

export type StringKeys<T> = keyof T & string;

export type Assign<Target, Source> = IfNever<Target, Source, Omit<Target, keyof (Target | Source)> & Source>;

export type AwaitedReturnType<F extends AnyFunction> = Awaited<ReturnType<F>>;

export type IfCommonKeys<Target, Source, T, F> = IfNever<keyof (Target | Source), F, T>;

export type IfDefined<T, D, U> = undefined extends T ? U : D;

export type IfNever<T, N, O> = [T] extends [never] ? N : O;

export type ReturnTypeDefault<F, D = undefined> = F extends (...args: any) => infer R ? R : D;

export type AnyFunction = (...args: any[]) => any;

export type AnyNewable = {
  new (...args: any[]): any;
};

export type JoinTuples<A extends unknown[], B extends unknown[]> = [...A, ...B];

export type RangeTuple<T> = [min: T, max: T];

export type RangeTupleDistributive<T> = T extends any ? [min: T, max: T] : never;

export type NumberRangeTuple = RangeTuple<number>;

export type KeyValueTuple<K extends PropertyKey = PropertyKey, V = unknown> = [key: K, value: V];

export type TupleToArray<T extends any[]> = T[number][];

export type Predicate<A, T extends A = A> =
  | ((value: T, index: number, array: readonly A[]) => value is T)
  | ((value: T, index: number, array: readonly A[]) => unknown);

export type TypePredicateFn<T> = (input: unknown) => input is T;

export type TypeAssertionFn<T> = (input: unknown) => asserts input is T;

export type CompareFn<T> = (a: T, b: T) => number;

export type DeepNonNullable<T> = T extends Record<PropertyKey, unknown>
  ? {
      [P in keyof T]: DeepNonNullable<T[P]>;
    }
  : NonNullable<T>;

export type Entries<T extends object> = {
  [P in keyof T]: KeyValueTuple<P, T[P]>;
}[keyof T];

export type NonNullableEntries<T extends object> = {
  [P in keyof T]: KeyValueTuple<P, NonNullable<T[P]>>;
}[keyof T];

export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type Unwritable<T> = T extends Writable<infer Inner> ? Readonly<Inner> : Readonly<T>;

export type GetIndex<T> = {
  [K in keyof T as symbol extends K ? K : string extends K ? K : number extends K ? K : never]: T[K];
};

export type RemoveIndex<T> = {
  [K in keyof T as symbol extends K ? never : string extends K ? never : number extends K ? never : K]: T[K];
};

export type StringPropertyKeys<Data extends Record<PropertyKey, unknown>> = Extract<keyof RemoveIndex<Data>, string>;

export type LowercaseProperties<Type extends Record<PropertyKey, unknown>> = {
  [Property in keyof Type as Lowercase<Extract<Property, string>>]: Type[Property];
} & Omit<Type, StringPropertyKeys<Type>>;

export type AllOrNone<T> = T | { [K in keyof T]?: never };

export type OptionalExcept<T, K extends keyof T> = T extends any ? Partial<Omit<T, K>> & Pick<T, K> : never;

export type First<T extends any[]> = T extends [infer Data, ...any[]] ? Data : never;

export type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

export type Head<T extends any[]> = T extends [...infer Data, any] ? Data : any[];

export type Tail<T extends any[]> = T extends [any, ...infer Data] ? Data : any[];

export type NonVoid<T> = T extends void ? never : T;

export type GetLength<A extends any[]> = A extends { length: infer L } ? L : never;

export type IfLength<A extends any[], L extends number, T, F> = GetLength<A> extends L ? T : F;

export type IfEmpty<A extends any[], T, F> = GetLength<A> extends 0 ? T : F;

export type JsonObject = { [key: string]: JsonValue };

export type JsonArray = JsonValue[];

export type JsonValue = string | number | boolean | null | object | JsonObject | JsonArray;

export type PartialKeys<T, K extends keyof T> = T extends any ? Omit<T, K> & Partial<Pick<T, K>> : never;

export type OnlyOne<Type extends Record<PropertyKey, unknown>> = {
  [Property in keyof Type]: Omit<Type, Property> & Partial<Record<Property, never>>;
}[keyof Type];

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

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
