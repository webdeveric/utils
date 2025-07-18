import type { IfArray, IfArrayLike } from './arrays.js';
import type { Primitive } from './common.js';
import type { CamelCase } from './strings.js';
import type { KeyValueTuple } from './tuples.js';
import type { CanBeUndefined, IfNever } from './utils.js';

export type Assign<Target, Source> = IfNever<Target, Source, Omit<Target, keyof (Target | Source)> & Source>;

export type Entries<T extends object> = {
  [P in keyof T]: KeyValueTuple<P, T[P]>;
}[keyof T];

export type NonNullableEntries<T extends object> = {
  [P in keyof T]: KeyValueTuple<P, NonNullable<T[P]>>;
}[keyof T];

export type NonNullableProperties<Type> = {
  [Key in keyof Type]: NonNullable<Type[Key]>;
};

/**
 * Return a type containing all method names
 */
export type MethodNames<Type, Key extends keyof Type = keyof Type> = Key extends PropertyKey
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    Type[Key] extends Function
    ? Key
    : never
  : never;

/**
 * Get keys of `Type` for use in `Path`.
 * Keys should not be symbols.
 *
 * @internal
 */
export type ValidKeys<Type extends object> = object extends Type
  ? never
  : Exclude<keyof Type, IfArrayLike<Type, symbol | MethodNames<Type>, symbol>>;

/**
 * Get the possible dot notations for a given `Type`.
 *
 * @internal
 *
 * @example
 * ```ts
 * type ExampleNotation = PathDotNotation<{
 *   job: {
 *     title: string;
 *   }
 * }>;
 * ```
 * Equals:
 * ```ts
 * type ExampleNotation = "job" | "job.title";
 * ```
 */
export type PathDotNotation<Type extends object, Key extends keyof Type = keyof Type> =
  Key extends ValidKeys<Type>
    ? Type[Key] extends Primitive
      ? Key
      : Key | `${Key}.${PathDotNotation<NonNullable<Type[Key]>>}`
    : never;

/**
 * Get the valid keys and dot notations for a given `Type`.
 *
 * @example
 * ```ts
 * type ExampleNotation = Path<{
 *   job: {
 *     title: string;
 *   }
 * }>;
 * ```
 * Equals:
 * ```ts
 * type ExampleNotation = "job" | "job.title";
 * ```
 */
export type Path<Type extends object> = PathDotNotation<NonNullableProperties<Type>, keyof Type> | ValidKeys<Type>;

/**
 * @internal
 */
export type MaybeOptional<Type, Optional extends boolean> = Optional extends true ? Type | undefined : Type;

/**
 * @internal
 */
export type GetValueForKey<
  Type extends object,
  Key extends PropertyKey,
  Optional extends boolean = CanBeUndefined<Type, true, false>,
> = Key extends keyof Type
  ? MaybeOptional<Type[Key], IfArray<Type, true, Optional>> // array items should always be checked for undefined
  : Key extends `${infer Index extends number}`
    ? Index extends keyof Type
      ? MaybeOptional<Type[Index], IfArray<Type, true, Optional>>
      : never
    : never;

/**
 * Get the type for a given dot notation path.
 *
 * @example
 * ```ts
 * type ExampleValue = PathValue<{
 *   job: {
 *     title: string;
 *   }
 * }, 'job.title'>;
 * ```
 * Equals:
 * ```ts
 * type ExampleValue = string;
 * ```
 */
export type PathValue<
  Type extends object,
  TargetPath extends Path<Type>,
  Optional extends boolean = CanBeUndefined<Type, true, false>,
> = TargetPath extends `${infer Key}.${infer Rest}`
  ? GetValueForKey<Type, Key, Optional> extends infer Value
    ? Rest extends Path<NonNullable<Value>>
      ? PathValue<NonNullable<Value>, Rest, CanBeUndefined<Value, true, false>>
      : never
    : never
  : GetValueForKey<Type, TargetPath, Optional>;

export type PathValues<Type extends object, TargetPaths extends Path<Type>> = {
  [TargetPath in TargetPaths as CamelCase<`${TargetPath}`, '.'>]: PathValue<Type, TargetPath>;
};
