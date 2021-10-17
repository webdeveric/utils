import { normalize, NormalizerFn } from '../src/normalize';

type Person = {
  name: string;
  details?: {
    jobTitle: string;
  };
}

describe('normalize()', () => {
  const person: Person = {
    name: 'Test',
    details: {
      jobTitle: 'Developer',
    },
  };

  it('Returns a normalized object', () => {
    const normalizedPerson = normalize(person, {
      name: name => name.toLowerCase(),
    });

    expect(normalizedPerson.name).toBe('test');
  });

  it('Returns a deeply normalized object', () => {
    const normalizedPerson = normalize<Person>(person, {
      details: {
        jobTitle: jobTitle => jobTitle.toLocaleUpperCase(),
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
        jobTitle: jobTitle => jobTitle.toLocaleUpperCase(),
      },
    });

    expect(normalizedPerson.details?.jobTitle).toBeUndefined();
  });

  it('Initializes undefined values', () => {
    const normalizedPerson = normalize<Person>({
      name: 'Test',
    }, {
      details: [
        details => {
          return details ?? {
            jobTitle: 'Default',
          };
        },
        {
          jobTitle: jobTitle => jobTitle.toLocaleUpperCase(),
        },
      ],
    });

    expect(normalizedPerson.details?.jobTitle).toBe('DEFAULT');
  });

  it('Skips initialization if not undefined', () => {
    const normalizedPerson = normalize<Person>({
      name: 'Test',
      details: {
        jobTitle: 'Tester',
      },
    }, {
      details: [
        details => {
          return details ?? {
            jobTitle: 'Default',
          };
        },
        {
          jobTitle: jobTitle => jobTitle.toLocaleUpperCase(),
        },
      ],
    });

    expect(normalizedPerson.details?.jobTitle).toBe('TESTER');
  });

  it('Initializer must be a function', () => {
    expect(() => {
      normalize<Person>(person, {
        details: [
          undefined as unknown as NormalizerFn<Person['details'], Person>,
          {
            jobTitle: jobTitle => jobTitle.toLocaleUpperCase(),
          },
        ],
      });
    }).toThrow();
  });

  it('Can make an object from an undefined input', () => {
    const normalizedPerson = normalize<Person>(
      undefined as unknown as Person,
      [
        person => {
          return person ?? {
            name: 'Default Name',
          };
        },
        {
          name: name => name.toLocaleUpperCase(),
        },
      ],
    );

    expect(normalizedPerson.name).toBe('DEFAULT NAME');
  });

  it('Throws when normalizers is invalid', () => {
    expect(() => {
      normalize(person, {
        name: null as unknown as NormalizerFn<string, Person>,
      });
    }).toThrow();
  });

  describe('context', () => {
    it('Has a reference to the original record', () => {
      expect.assertions(2);

      const normalizedPerson = normalize<Person>(person, {
        name: (name, context) => {
          expect(context.record).toEqual(person);

          return name.toLocaleUpperCase();
        },
      });

      expect(normalizedPerson.name).toBe('TEST');
    });

    it('Has a reference to the current record', () => {
      expect.assertions(2);

      const normalizedPerson = normalize<Person>(person, {
        name: name => name.toLocaleUpperCase(),
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

          return name;
        },
        details: {
          jobTitle: (jobTitle, context) => {
            expect(context.data.test).toBe(true);

            return jobTitle;
          },
        },
      });
    });
  });
});
