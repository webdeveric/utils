// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<PropertyKey, any>;

export type NumericString = `${number}` | `${number}.${number}`;

export type NumericValue = number | bigint | NumericString;
