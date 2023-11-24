import { isGeneratorObject } from 'node:util/types';

import { describe, expect, it } from 'vitest';

import { combinations } from '../src/combinations.js';

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
