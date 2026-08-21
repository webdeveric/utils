import { describe, it, expect, vi, afterEach } from 'vitest';

import { convert, type AnyConverter, type ConvertFn } from '../src/convert.js';

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

  describe('Prototype pollution protection', () => {
    afterEach(() => {
      // Guard other tests in case an assertion fails before pollution is verified absent.
      Reflect.deleteProperty(Object.prototype, 'polluted');
    });

    it('Ignores a "__proto__" key so it cannot reach Object.prototype', () => {
      const maliciousConverter = {
        name: (input: { name: string }) => input.name,
        ['__proto__']: {
          polluted: () => 'polluted',
        },
      };

      const result = convert({ name: 'Test' }, maliciousConverter);

      expect(Object.prototype).not.toHaveProperty('polluted');
      expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    });

    it('Never invokes converters keyed by "constructor" or "prototype"', () => {
      const constructorConverter = vi.fn(() => 'polluted');
      const prototypeConverter = vi.fn(() => 'polluted');

      const maliciousConverter = {
        ['constructor']: constructorConverter,
        ['prototype']: prototypeConverter,
      };

      convert({}, maliciousConverter as unknown as AnyConverter<unknown, unknown>);

      expect(constructorConverter).not.toHaveBeenCalled();
      expect(prototypeConverter).not.toHaveBeenCalled();
    });
  });
});
