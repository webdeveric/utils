import { describe, it, expect } from 'vitest';

import { getType } from '../src/getType.js';

describe('getType()', function () {
  it('returns var data type', function () {
    const types = new Map();

    types.set({}, 'Object');
    types.set(Object.create(null), 'Object');
    types.set(new (class {})(), 'Object');
    types.set([], 'Array');
    types.set(new Int8Array(), 'Int8Array');
    types.set(Buffer.from(''), 'Uint8Array');
    types.set(void 0, 'Undefined');
    types.set(null, 'Null');
    types.set(true, 'Boolean');
    types.set('a', 'String');
    types.set(1, 'Number');
    types.set(3.14, 'Number');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    types.set(() => {}, 'Function');
    types.set(class {}, 'Function');
    types.set(Symbol(), 'Symbol');

    for (const [obj, type] of types) {
      expect(getType(obj)).toEqual(type);
    }
  });
});
