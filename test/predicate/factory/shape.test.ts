import { describe, expect, it } from 'vitest';

import { optional } from '../../../src/predicate/factory/optional.js';
import { range } from '../../../src/predicate/factory/range.js';
import { shape, type ObjectShapeRecord } from '../../../src/predicate/factory/shape.js';
import { isNumber } from '../../../src/predicate/isNumber.js';
import { isOptionalString } from '../../../src/predicate/isOptionalString.js';
import { isString } from '../../../src/predicate/isString.js';

import type { Branded } from '../../../src/types/branded.js';

describe('shape()', () => {
  type Name = Branded<string, 'Name'>;

  const isName = (input: unknown): input is Name => typeof input === 'string';

  enum Role {
    Admin = 'admin',
    User = 'user',
  }

  const valueSymbol = Symbol.for('value');

  type User = {
    name: Name;
    job: {
      title: string;
    };
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
    name: isName,
    job: {
      title: /\bsoftware\b/i,
    },
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

  it('Returns a type predicate function', () => {
    expect(shape(userShape)).instanceOf(Function);
  });

  it('Checks string and symbol properties', () => {
    const fn = shape(userShape);

    expect(fn({})).toBeFalsy();

    expect(
      fn({
        name: 'Test Testerson',
        job: {
          title: 'Software Engineer',
        },
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
        name: 'Test Testerson',
        job: {
          title: 'Senior Software Engineer',
        },
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

  it('Can check for additional properties', () => {
    const fn = shape(
      {
        name: isString,
      },
      false,
    );

    expect(
      fn({
        name: 'Test Testerson',
      }),
    ).toBeTruthy();

    expect(
      fn({
        name: 'Test Testerson',
        extra: 'not allowed',
      }),
    ).toBeFalsy();
  });
});
