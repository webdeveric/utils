import { getOwnKeys } from '../src/getOwnKeys';

describe('getOwnKeys()', () => {
  it('Returns an array of object keys', () => {
    const data = {
      name: 'Test',
      0: 'zero',
    };

    expect(getOwnKeys(data)).toEqual(expect.arrayContaining([ 'name', '0' ]));

    expect(getOwnKeys([ 'one', 'two' ])).toEqual(expect.arrayContaining([ '0', '1' ]));
  });

  it('Throws when not given an object or array', () => {
    expect(() => {
      getOwnKeys(null as unknown as Record<PropertyKey, unknown>);
    }).toThrow();
  });
});
