import { getOwnKeys } from '../src/getOwnKeys';

describe('getOwnKeys()', () => {
  it('Returns an array of object keys', () => {
    const details = Symbol.for('details');

    const data = {
      name: 'Test',
      0: 'zero',
      [ details ]: {},
    };

    expect(getOwnKeys(data)).toEqual(expect.arrayContaining([ 'name', '0', details ]));

    expect(getOwnKeys([ 'one', 'two' ])).toEqual(expect.arrayContaining([ '0', '1', 'length' ]));
  });

  it('Throws when not given an object or array', () => {
    expect(() => {
      getOwnKeys(null);
    }).toThrow();
  });
});
