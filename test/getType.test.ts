import { describe, it, expect } from 'vitest';

import { getType } from '../src/getType.js';

describe('getType()', function () {
  it.each([
    { input: {}, output: 'Object' },
    { input: Object.create(null), output: 'Object' },
    { input: new (class {})(), output: 'Object' },
    { input: [], output: 'Array' },
    { input: new Int8Array(), output: 'Int8Array' },
    { input: Buffer.from(''), output: 'Uint8Array' },
    { input: void 0, output: 'Undefined' },
    { input: null, output: 'Null' },
    { input: true, output: 'Boolean' },
    { input: 'a', output: 'String' },
    { input: 1, output: 'Number' },
    { input: 3.14, output: 'Number' },
    { input: () => {}, output: 'Function' },
    { input: class {}, output: 'Function' },
    { input: Symbol(), output: 'Symbol' },
  ])('`$input` returns $output', function ({ input, output }) {
    expect(getType(input)).toEqual(output);
  });
});
