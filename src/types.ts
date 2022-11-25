export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

// eslint-disable-next-line @typescript-eslint/ban-types
export type Builtin = Date | Error | Function | Primitive | RegExp;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<PropertyKey, any>;

export type UnknownRecord = Record<PropertyKey, unknown>;

export type NumericString<T extends string | number = number> = `${T}` extends `${number}` ? `${T}` : never;

export type NumericValue = number | bigint | NumericString;

export type MaybePlural<T extends string> = T | `${T}s`;

export type StringKeys<T> = keyof T & string;

export type IfDefined<T, D, U> = undefined extends T ? U : D;

export type IfNever<T, N, O> = [T] extends [never] ? N : O;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReturnTypeDefault<F, D = undefined> = F extends (...args: any) => infer R ? R : D;

export type AnyNewable = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): any;
};

export type JoinTuples<A extends unknown[], B extends unknown[]> = [...A, ...B];

export type RangeTuple<T> = [min: T, max: T];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RangeTupleDistributive<T> = T extends any ? [min: T, max: T] : never;

export type NumberRangeTuple = RangeTuple<number>;

export type KeyValueTuple<K extends PropertyKey = PropertyKey, V = unknown> = [key: K, value: V];
