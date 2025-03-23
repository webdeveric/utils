import { describe, expect, it } from 'vitest';

import { optional } from '../../../src/predicate/factory/optional.js';
import { range } from '../../../src/predicate/factory/range.js';
import { shape, type ObjectShapeRecord } from '../../../src/predicate/factory/shape.js';
import { isNumber } from '../../../src/predicate/isNumber.js';
import { isOptionalString } from '../../../src/predicate/isOptionalString.js';
import { isString } from '../../../src/predicate/isString.js';

describe('shape()', () => {
  enum Role {
    Admin = 'admin',
    User = 'user',
  }

  const valueSymbol = Symbol.for('value');

  type User = {
    name: string;
    role: Role;
    value: number;
    age?: number;
    [valueSymbol]: number;
    contact?: {
      email: string;
      phone?: string;
    };
    tuple: [key: string, value: number];
  };

  type UserShape = ObjectShapeRecord<User>;

  const userShape = {
    name: /^Test$/,
    role: Role.User,
    value: range(0, 100),
    [valueSymbol]: range(0, 100_000),
    age: isNumber,
    contact: optional(
      shape({
        email: isString,
        phone: isOptionalString,
      }),
    ),
    tuple: ['PI', Math.PI],
  } satisfies UserShape;

  const fn = shape(userShape);

  it('Returns a type predicate function', () => {
    expect(fn).instanceOf(Function);
  });

  it('Checks string and symbol properties', () => {
    expect(fn({})).toBeFalsy();

    expect(
      fn({
        name: 'Test',
        role: Role.User,
        value: 100,
        [valueSymbol]: 100_000,
        age: 100,
        contact: undefined,
        tuple: ['PI', Math.PI],
      }),
    ).toBeTruthy();

    expect(
      fn({
        name: 'Test',
        role: Role.User,
        value: 100,
        [valueSymbol]: 100_000,
        age: 100,
        contact: {
          email: 'me@example.com',
          phone: '555-1234',
        },
        tuple: ['PI', Math.PI],
      }),
    ).toBeTruthy();
  });
});
