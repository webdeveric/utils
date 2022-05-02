import { normalize, type NormalizerFn } from '../src/normalize';

type Person = {
  name: string;
  age?: number;
  details?: {
    jobTitle: string;
  };
};

describe('normalize()', () => {
  const person = Object.freeze<Person>({
    name: 'Test',
    details: {
      jobTitle: 'Developer',
    },
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

  it('Record contains NormalizerFn', () => {
    const normalizeAge: NormalizerFn<Person['age'], Person> = age => (typeof age === 'number' ? Math.abs(age) : 0);

    const normalizedPerson = normalize(person, {
      age: normalizeAge,
    });

    expect(normalizedPerson.age).toBe(0);
  });

  it('Allows normalizing undefined values', () => {
    const normalizedPerson = normalize<Person>(
      {
        name: 'Test',
      },
      {
        age: () => 100,
      },
    );

    expect(normalizedPerson.age).toBe(100);
  });

  it('Undefined value that has corresponding normalizer gets initialized as an object literal', () => {
    const normalizedPerson = normalize<Person>(
      {
        name: 'Test',
      },
      {
        details: {
          jobTitle: jobTitle => String(jobTitle).toLocaleUpperCase(),
        },
      },
    );

    expect(normalizedPerson.details?.jobTitle).toBe('UNDEFINED');
  });

  it('When given invalid normalizers, the input is returned', () => {
    expect(
      normalize(person, {
        name: null as unknown as NormalizerFn<Person['name'], Person>,
      }),
    ).toEqual(person);

    expect(normalize(person, null as unknown as NormalizerFn<Person, Person>)).toEqual(person);
  });

  describe('NormalizeFn', () => {
    it('Receives two arguments', () => {
      normalize(person, {
        name(...args) {
          expect(args).toHaveLength(2);

          return args[0];
        },
      });
    });

    describe('Property value', () => {
      it('Receives the property value', () => {
        const normalizeName: NormalizerFn<Person['name']> = name => {
          expect(typeof name).toBe('string');

          return name;
        };

        normalize(person, {
          name: normalizeName,
        });
      });
    });

    describe('Context', () => {
      it('Has a reference to the original value', () => {
        const normalizeName: NormalizerFn<Person['name'], Person> = (name, context) => {
          expect(context.original).toEqual(person);

          return name.toLocaleUpperCase();
        };

        normalize(person, {
          name: normalizeName,
        });
      });

      it('Has a reference to the current record', () => {
        const normalizedPerson = normalize(person, {
          name: name => name.toLocaleUpperCase(),
          details: {
            jobTitle(jobTitle, context) {
              expect(context.current).not.toBe(context.original);
              expect(context.original.name).toBe('Test');
              expect(context.current.name).toBe('TEST');

              return `${context.current.name}-${jobTitle}`;
            },
          },
        });

        expect(normalizedPerson.details?.jobTitle).toBe('TEST-Developer');
      });

      describe('Data', () => {
        type TimeContext = {
          now?: number;
        };

        it('Defaults to empty object', () => {
          const normalizeName: NormalizerFn<Person['name']> = (name, context) => {
            expect(context.data).toEqual({});

            return name;
          };

          normalize(person, {
            name: normalizeName,
          });
        });

        it('Custom type can be provided', () => {
          normalize<Person, TimeContext>(person, {
            age(_, context) {
              expect(context.data.now).toBeUndefined();

              return 100;
            },
          });
        });

        it('Can be initialized with your data', () => {
          const now = Date.now();

          const normalPerson = normalize<Person, Required<TimeContext>>(
            person,
            {
              age(_, context) {
                return context.data.now;
              },
            },
            () => {
              return {
                now,
              };
            },
          );

          expect(normalPerson.age).toBe(now);
        });

        it('Type can be inferred from the context initializer', () => {
          normalize(
            person,
            {
              name(_, context) {
                expect(typeof context.data.name).toBe('string');

                return context.data.name;
              },
            },
            () => {
              return {
                name: 'Test Testerson',
              };
            },
          );
        });
      });
    });
  });
});
