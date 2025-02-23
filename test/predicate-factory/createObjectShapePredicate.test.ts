import { describe, expect, it } from 'vitest';

import { isNumber } from '../../src/index.js';
import { isOptionalString } from '../../src/predicate/isOptionalString.js';
import { isString } from '../../src/predicate/isString.js';
import { createObjectShapePredicate } from '../../src/predicate-factory/createObjectShapePredicate.js';

describe('createObjectShapePredicate', () => {
  type User = {
    name: string;
    age?: number;
    contact: {
      email: string;
      phone?: string;
    };
    tuple: [key: string, value: number];
  };

  it('Returns a type predicate function', () => {
    expect(createObjectShapePredicate({})).toBeInstanceOf(Function);
  });

  it('Accepts an object shape record', () => {
    const fn = createObjectShapePredicate<User>({
      name: /^Test$/,
      age: isNumber,
      contact: {
        email: isString,
        phone: isOptionalString,
      },
      tuple: ['PI', Math.PI],
    });

    expect(fn('')).toBeFalsy();
    expect(fn({})).toBeFalsy();

    expect(
      fn({
        name: 'Name',
        age: 99,
        title: null,
      }),
    ).toBeFalsy();

    expect(
      fn({
        name: 'Test',
        age: 100,
        contact: {
          email: 'test@example.com',
          phone: undefined,
        },
        tuple: ['PI', Math.PI],
      }),
    ).toBeTruthy();
  });
});
