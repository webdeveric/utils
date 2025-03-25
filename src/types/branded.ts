import type { Primitive } from './common.js';

export declare const brand: unique symbol;

export type Brand<Id> = {
  [brand]: Id;
};

export type Branded<Type, Id> = Type & Brand<Id>;

export type Unbranded<Type> = Type extends Branded<infer Inner, unknown> ? Omit<Inner, typeof brand> : Type;

export type RemoveBranding<Type> = Type extends Primitive
  ? Unbranded<Type>
  : {
      [Property in keyof Type]: Type extends Primitive ? Unbranded<Type[Property]> : RemoveBranding<Type[Property]>;
    };
