import { describe, expectTypeOf, it } from 'vitest';

import { range } from '../../../src/predicate/factory/range.js';
import { shape, type InferTypeFromShape, type ObjectShapeRecord } from '../../../src/predicate/factory/shape.js';
import { isNumber } from '../../../src/predicate/isNumber.js';
import { isOptionalString } from '../../../src/predicate/isOptionalString.js';
import { isString } from '../../../src/predicate/isString.js';

import type { Pretty } from '../../../src/types/utils.js';

describe('shape()', () => {
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
    value: range(0, 100),
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
    const fn = shape(userShape);

    expectTypeOf(fn).toBeFunction();
    expectTypeOf(fn).parameter(0).toEqualTypeOf<unknown>();
  });

  describe('Type parameters', () => {
    it('Infers type parameter values', () => {
      const fn = shape(userShape);

      if (fn(user)) {
        expectTypeOf(user).toEqualTypeOf<InferredUserTypeConst>();
      }
    });

    it('Can provide the Type to constrain the Shape', () => {
      const fn = shape<User>(userShape);

      if (fn(user)) {
        expectTypeOf(user).toEqualTypeOf<Pretty<User & InferredUserType>>();
      }
    });

    it('Can provide the Type and Shape parameters', () => {
      const fn = shape<{ name: string }, { name: string | RegExp }>({
        name: 'test',
      });

      if (fn(user)) {
        expectTypeOf(user).toEqualTypeOf<{ name: string }>();
      }
    });
  });
});
