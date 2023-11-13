declare const brand: unique symbol;

type Brand<Id> = {
  [brand]: Id;
};

export type Branded<Type, Id> = Type & Brand<Id>;
