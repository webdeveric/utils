/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */

export type IfNever<Type, T, F> = [Type] extends [never] ? T : F;

export type IfCommonKeys<Target, Source, T, F> = IfNever<keyof (Target | Source), F, T>;

export type IfDefined<Type, T, F> = undefined extends Type ? F : T;

export type IfUnknown<Type, T, F> = unknown extends Type ? T : F;

export type IfPromise<Type, T, F> = Type extends Promise<any> ? T : F;

export type IfSame<Left, Right, T, F> = [Left] extends [Right] ? ([Right] extends [Left] ? T : F) : F;

export type NotPromise<Type> = Type extends Promise<any> ? never : Type;

export type CanBeUndefined<Type, T, F> = Type | undefined extends Type ? T : F;

export type ReturnTypeDefault<Func, Default = undefined> = Func extends (...args: any[]) => infer R ? R : Default;

export type DeepNonNullable<Type> =
  Type extends Record<PropertyKey, unknown>
    ? {
        [Key in keyof Type]: DeepNonNullable<Type[Key]>;
      }
    : NonNullable<Type>;

export type Writable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

export type Unwritable<Type> = Type extends Writable<infer Inner> ? Readonly<Inner> : Readonly<Type>;

export type GetIndex<Type> = {
  [Key in keyof Type as symbol extends Key
    ? Key
    : string extends Key
      ? Key
      : number extends Key
        ? Key
        : never]: Type[Key];
};

/**
 * All keys exist or none are allowed
 */
export type AllOrNone<Type> = Type | { [Key in keyof Type]?: never };

/**
 * The specified keys are required and all others are optional
 */
export type OptionalExcept<Type, Keys extends keyof Type> = Type extends any
  ? Partial<Omit<Type, Keys>> & Required<Pick<Type, Keys>>
  : never;

/**
 * The specified keys are optional and all others are required
 */
export type RequiredExcept<Type, Keys extends keyof Type> = Type extends any
  ? Required<Omit<Type, Keys>> & Partial<Pick<Type, Keys>>
  : never;

/**
 * Return a type with specific keys optional.
 */
export type OptionalKeys<Type, Keys extends keyof Type> = Type extends any
  ? Omit<Type, Keys> & Partial<Pick<Type, Keys>>
  : never;

/**
 * Return a type with specific keys required.
 */
export type RequiredKeys<Type, Keys extends keyof Type> = Type extends any
  ? Omit<Type, Keys> & Required<Pick<Type, Keys>>
  : never;

export type NonVoid<Type> = Exclude<Type, void>;

export type Defined<Type> = Exclude<Type, undefined | void>;

export type RemoveNever<Type> = {
  [Key in keyof Type as [Type[Key]] extends [never] ? never : Key]: Type[Key];
};

/**
 * Return a list of keys where the property value match the `DataType`.
 */
export type KeysWhere<Type, DataType, Key extends keyof Type = keyof Type> = Key extends PropertyKey
  ? Type[Key] extends DataType
    ? Key
    : never
  : never;

/**
 * Construct a type where all the property values match the `DataType`.
 */
export type PickByType<Type, DataType> = {
  [Property in KeysWhere<Type, DataType>]: Type[Property];
};

export type NumberKeys<Type> = keyof Type & number;

export type StringKeys<Type> = keyof Type & string;

export type SymbolKeys<Type> = keyof Type & symbol;

export type Values<Type> = Type[keyof Type];

export type DeepPartial<Type> = Type extends object
  ? {
      [Property in keyof Type]?: DeepPartial<Type[Property]>;
    }
  : Type;

export type UnionToIntersection<Union> = (Union extends any ? (union: Union) => void : never) extends (
  union: infer Type extends Union,
) => void
  ? Type
  : never;

export type IntersectionOf<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? First & IntersectionOf<Rest>
  : unknown;

export type UnionOf<T extends unknown[]> = T extends [infer First, ...infer Rest] ? First | UnionOf<Rest> : never;

export type Pretty<Type> = {
  [Property in keyof Type]: Type[Property];
} & unknown;

export type Simplify<Type> = Type extends string
  ? string
  : Type extends number
    ? number
    : Type extends boolean
      ? boolean
      : Type extends bigint
        ? bigint
        : Type extends symbol
          ? symbol
          : Type extends undefined
            ? undefined
            : Type extends null
              ? null
              : Type extends Function
                ? Type
                : Type extends object
                  ? {
                      [Key in keyof Type]: Simplify<Type[Key]>;
                    }
                  : Type;

/**
 * Check if the keys of a type are only numeric.
 */
export type IfHasOnlyNumericKeys<Type, T, F> = `${Exclude<keyof Type, symbol>}` extends `${number}` ? T : F;

export type HasOnlyNumericKeys<Type> = IfHasOnlyNumericKeys<Type, true, false>;
