import { isGeneratorObject } from 'node:util/types';

import { describe, expect, it } from 'vitest';

import { combinations } from '../src/combinations.js';
import { counter } from '../src/counter.js';

describe('combinations()', () => {
  it('Returns a Generator', () => {
    expect(
      isGeneratorObject(
        combinations({
          id: [1, 2, 3],
        }),
      ),
    ).toBeTruthy();
  });

  it('Empty object generates an empty array', () => {
    expect(Array.from(combinations({}))).toEqual([]);
  });

  it('Generates combos from input', () => {
    expect(
      Array.from(
        combinations({
          name: ['Test', 'Demo'],
        }),
      ),
    ).toEqual([
      {
        name: 'Test',
      },
      {
        name: 'Demo',
      },
    ]);
  });

  it('Supports Generators', () => {
    function* userGenerator(amount: number): Generator<object> {
      for (const id of counter(1, amount)) {
        yield {
          id,
          parents: counter(0, 2),
          spouse: counter(0, 1),
          children: counter(0, 2),
        };
      }
    }

    const users = Array.from(
      combinations({
        user: userGenerator(10),
      }),
    );

    expect(users.length).toBe(180);

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user: {
            id: expect.any(Number),
            parents: expect.any(Number),
            spouse: expect.any(Number),
            children: expect.any(Number),
          },
        }),
      ]),
    );
  });

  it('Recursively generates nested objects', () => {
    expect(
      Array.from(
        combinations({
          id: 1,
          job: {
            title: ['Dev', 'Admin'],
          },
        }),
      ),
    ).toEqual([
      {
        id: 1,
        job: {
          title: 'Dev',
        },
      },
      {
        id: 1,
        job: {
          title: 'Admin',
        },
      },
    ]);
  });

  it('Has a type parameter', () => {
    type User = {
      name: string;
      id: number;
      job: { title: string };
    };

    const combo = combinations<User>({
      name: 'Test Testerson',
      id: 1,
      job: {
        title: ['Software Engineer', 'Manager'],
      },
    });

    const { value } = combo.next();

    expect(value).toEqual({
      name: 'Test Testerson',
      id: 1,
      job: {
        title: 'Software Engineer',
      },
    });
  });
});
