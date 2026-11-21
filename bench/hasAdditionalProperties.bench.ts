import { test } from 'vitest';

import { hasAdditionalProperties } from '../src/hasAdditionalProperties.js';

const input = {
  name: 'Test',
  age: 100_000,
  job: {
    title: 'Tester',
  },
};

const input2 = {
  ...input,
  extra: true,
};

const knownProperties = ['name', 'age', 'job'];

test('hasAdditionalProperties()', async ({ bench }) => {
  await bench('hasAdditionalProperties()', () => {
    hasAdditionalProperties(input, knownProperties);
    hasAdditionalProperties(input2, knownProperties);
  }).run();
});
