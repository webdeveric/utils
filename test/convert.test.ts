import { describe, it, expect } from 'vitest';

import { convert, type ConvertFn } from '../src/convert.js';

describe('convert()', () => {
  it('Converts from one type to another using a function', () => {
    const result = convert(true, (input) => !input);

    expect(result).toBeFalsy();
  });

  it('Converts from one type to another using rules', () => {
    const result = convert(false, {
      testing: (input) => !input,
    });

    expect(result).toEqual(
      expect.objectContaining({
        testing: true,
      }),
    );
  });

  it('Handles functions', () => {
    type Animal = {
      speak: () => string;
    };

    const wilson = {
      meow: () => 'FEED ME!',
    };

    const animal = convert<typeof wilson, Animal>(wilson, {
      speak(cat) {
        return cat.meow.bind(this);
      },
    });

    expect(animal.speak).toBeInstanceOf(Function);
    expect(animal.speak()).toBe('FEED ME!');
  });

  it('Uses generics for rules', () => {
    type SimplePerson = {
      name: string;
      age: number;
      jobTitle: string;
    };

    type DetailedPerson = {
      name: {
        first: string;
        middle?: string;
        last: string;
      };
      age?: number;
      job: {
        title: string;
      };
    };

    const simplePerson: SimplePerson = {
      name: 'Test Testerson',
      age: 100,
      jobTitle: 'Tester',
    };

    const detailedPerson = convert<SimplePerson, DetailedPerson>(simplePerson, {
      name(person) {
        const parts = String(person.name).normalize().split(/\s+/);

        return {
          first: parts[0] ?? '',
          last: parts[1] ?? '',
        };
      },
      job: {
        title: (person) => person.jobTitle,
      },
    });

    expect(detailedPerson).toEqual(
      expect.objectContaining({
        name: expect.objectContaining({
          first: 'Test',
          last: 'Testerson',
        }),
        job: expect.objectContaining({
          title: 'Tester',
        }),
      }),
    );
  });

  it('Can throw a TypeError', () => {
    expect(() => {
      convert(false, null as unknown as ConvertFn<unknown, unknown>);
    }).toThrow(TypeError);
  });
});
