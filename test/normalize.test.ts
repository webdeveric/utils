import { normalize, type NormalizerFn } from '../src/normalize';

type Person = {
  name: string;
  age?: number;
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
    const normalizedPerson = normalize(person, {
      details: {
        jobTitle: jobTitle => String(jobTitle).toLocaleUpperCase(),
      },
    });

    expect(normalizedPerson.name).toBe('Test');
    expect(normalizedPerson.details?.jobTitle).toBe('DEVELOPER');
  });

  it('Allows normalizing undefined values', () => {
    const normalizedPerson = normalize<Person>({
      name: 'Test',
    }, {
      age: () => 100,
    });

    expect(normalizedPerson.age).toBe(100);
  });

  it('Undefined value that has corresponding normalizer gets initialized as an object literal', () => {
    const normalizedPerson = normalize<Person>({
      name: 'Test',
    }, {
      details: {
        jobTitle: jobTitle => String(jobTitle).toLocaleUpperCase(),
      },
    });

    expect(normalizedPerson.details?.jobTitle).toBe('UNDEFINED');
  });

  it('When given invalid normalizers, the input is returned', () => {
    expect(normalize(person, {
      name: null as unknown as NormalizerFn<string, Person>,
    })).toEqual(person);

    expect(normalize(person, null as unknown as NormalizerFn<Person, Person>)).toEqual(person);
  });

  describe('context', () => {
    it('Has a reference to the original value', () => {
      expect.assertions(2);

      const normalizedPerson = normalize(person, {
        name: (name, context) => {
          expect(context.original).toEqual(person);

          return String(name).toLocaleUpperCase();
        },
      });

      expect(normalizedPerson.name).toBe('TEST');
    });

    it('Has a reference to the current record', () => {
      expect.assertions(2);

      const normalizedPerson = normalize(person, {
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

      normalize(person, {
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

    it('Can be initialized with your data', () => {
      expect.assertions(2);

      const normalPerson = normalize<Person, Record<'name', string>>(
        person,
        {
          name: (_name, context) => {
            return String(context.data.name);
          },
        },
        (person, normalizers) => {
          expect(typeof normalizers === 'object' && 'name' in normalizers).toBeTruthy();

          return {
            name: person.name.toUpperCase(),
          };
        },
      );

      expect(normalPerson.name).toBe(person.name.toUpperCase());
    });
  });
});
