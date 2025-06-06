import { bench } from 'vitest';

import { convert, type ConvertRecord } from '../src/convert.js';

const input = {
  firstName: 'Test',
  lastName: 'Testerson',
  age: 42,
};

const converter: ConvertRecord<typeof input, { fullName: string; age: number }> = {
  fullName: (data) => data.firstName + ' ' + data.lastName,
  age: (data) => data.age,
};

bench('convert()', () => {
  convert(input, converter);
});
