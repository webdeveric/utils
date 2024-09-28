/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NotPromise } from './utils.js';

export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export type NumericString<T extends string | number = number> = `${T}` extends `${number}` ? `${T}` : never;

export type NumericValue = number | bigint | NumericString;

export type JsonObject = { [key: string]: JsonValue };

export type JsonArray = JsonValue[];

export type JsonValue = string | number | boolean | null | object | JsonObject | JsonArray;

export type TypeOf = 'undefined' | 'object' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Builtin = Date | Error | Function | Primitive | RegExp;

export type AnyFunction = (...args: any[]) => any;

export type AnySyncFunction = (...args: any[]) => NotPromise<any>;

export type AnyAsyncFunction = (...args: any[]) => Promise<any>;

export type AnyNewable = {
  new (...args: any[]): any;
};
