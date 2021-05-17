import { compose } from '../src/compose';

describe('compose()', () => {
  it('composes functions into one', async () => {
    const fn1 = jest.fn(data => data);
    const fn2 = jest.fn(() => undefined);
    const fn3 = jest.fn(() => null);
    const fn4 = jest.fn(data => data.toUpperCase());

    const composed = compose(fn1, fn2, fn3, fn4);

    expect(composed("composed")).toEqual("COMPOSED");
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(fn3).toHaveBeenCalled();
    expect(fn4).toHaveBeenCalled();
  });
});
