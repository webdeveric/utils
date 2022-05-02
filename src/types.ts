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
