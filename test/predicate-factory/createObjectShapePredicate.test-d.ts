import { describe, expectTypeOf, it } from 'vitest';

import { createNumberRangePredicate, isNumber } from '../../src/index.js';
import { isOptionalString } from '../../src/predicate/isOptionalString.js';
import { isString } from '../../src/predicate/isString.js';
import {
  createObjectShapePredicate,
  type InferTypeFromShape,
  type ObjectShapeRecord,
} from '../../src/predicate-factory/createObjectShapePredicate.js';

describe('createObjectShapePredicate', () => {
  enum Role {
    Admin = 'admin',
    User = 'user',
  }

  type User = {
    name: string;
    role: Role;
    value: number;
    age?: number;
    contact: {
      email: string;
      phone?: string;
    };
    tuple: [key: string, value: number];
  };

  const user: unknown = {
    name: 'Test',
    role: Role.User,
    value: 50,
    age: 100,
    contact: {
      email: 'test@example.com',
      phone: undefined,
    },
    tuple: ['PI', Math.PI],
  } satisfies User;

  type UserShape = ObjectShapeRecord<User>;

  const userShape = {
    name: /^Test$/,
    role: Role.User,
    value: createNumberRangePredicate(0, 100),
    age: isNumber,
    contact: {
      email: isString,
      phone: isOptionalString,
    },
    tuple: ['PI', Math.PI],
  } satisfies UserShape;

  type InferredUserType = InferTypeFromShape<UserShape>;
  type InferredUserTypeConst = InferTypeFromShape<typeof userShape>;

  it('Returns a type predicate function', () => {
    const fn = createObjectShapePredicate(userShape);

    expectTypeOf(fn).toBeFunction();
    expectTypeOf(fn).parameter(0).toMatchTypeOf<unknown>();
  });

  describe('Type parameters', () => {
    it('Infers type parameter values', () => {
      const fn = createObjectShapePredicate(userShape);

      if (fn(user)) {
        expectTypeOf(user).toMatchTypeOf<InferredUserTypeConst>();
      }
    });

    it('Can provide the Type to constrain the Shape', () => {
      const fn = createObjectShapePredicate<User>(userShape);

      if (fn(user)) {
        expectTypeOf(user).toMatchTypeOf<InferredUserType>();
      }
    });

    it('Can provide the Type and Shape parameters', () => {
      const fn = createObjectShapePredicate<{ name: string }, { name: string | RegExp }>({
        name: 'test',
      });

      if (fn(user)) {
        expectTypeOf(user).toMatchTypeOf<{ name: string }>();
      }
    });
  });
});
