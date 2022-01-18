import { normalize, type NormalizerFn } from '../src/normalize';

type Person = {
  name: string;
  details?: {
    jobTitle: string;
  };
}

describe('normalize()', () => {
  const person = Object.freeze<Person>({
    name: 'Test',
    details: {
      jobTitle: 'Developer',
    },
  });

  it('Returns input when no normalizers are provided', () => {
    expect(normalize(person)).toEqual(person);
  });

  it('Returns a normalized object', () => {
    const normalizedPerson = normalize(person, {
      name: name => String(name).toLowerCase(),
    });

    expect(normalizedPerson.name).toBe('test');
  });

  it('Returns a deeply normalized object', () => {
    const normalizedPerson = normalize<Person>(person, {
      details: {
        jobTitle: jobTitle => String(jobTitle).toLocaleUpperCase(),
      },
    });

    expect(normalizedPerson.name).toBe('Test');
    expect(normalizedPerson.details?.jobTitle).toBe('DEVELOPER');
  });

  it('Skips undefined values', () => {
    const normalizedPerson = normalize<Person>({
      name: 'Test',
    }, {
      details: {
        jobTitle: jobTitle => String(jobTitle).toLocaleUpperCase(),
      },
    });

    expect(normalizedPerson.details?.jobTitle).toBeUndefined();
  });

  it('Throws when normalizers is invalid', () => {
    expect(() => {
      normalize(person, {
        name: null as unknown as NormalizerFn<string, Person>,
      });
    }).toThrow();
  });

  describe('context', () => {
    it('Has a reference to the original value', () => {
      expect.assertions(2);

      const normalizedPerson = normalize<Person>(person, {
        name: (name, context) => {
          expect(context.original).toEqual(person);

          return String(name).toLocaleUpperCase();
        },
      });

      expect(normalizedPerson.name).toBe('TEST');
    });

    it('Has a reference to the current record', () => {
      expect.assertions(2);

      const normalizedPerson = normalize<Person>(person, {
        name: name => String(name).toLocaleUpperCase(),
        details: {
          jobTitle: (jobTitle, context) => {
            expect(context.current.name).toBe('TEST');

            return `${context.current.name}-${jobTitle}`;
          },
        },
      });

      expect(normalizedPerson.details?.jobTitle).toBe('TEST-Developer');
    });

    it('Can hold arbitrary data', () => {
      expect.assertions(1);

      normalize<Person>(person, {
        name: (name, context) => {
          context.data.test = true;

          return String(name);
        },
        details: {
          jobTitle: (jobTitle, context) => {
            expect(context.data.test).toBe(true);

            return String(jobTitle);
          },
        },
      });
    });
  });
});
