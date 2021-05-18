import { delayAnimationFrame, delayAnimationFrames } from '../src/delayAnimationFrame';

describe('delay animation frames', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => setImmediate(cb));
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  describe('delayAnimationFrame()', () => {
    it('Delays one animation frame', async () => {
      const delay = delayAnimationFrame();

      await expect(delay).resolves.toBeUndefined();
    });

    it('Specifies the return value', async () => {
      const delay = delayAnimationFrame('value');

      await expect(delay).resolves.toBe('value');
    });
  });

  describe('delayAnimationFrames()', () => {
    it('Delays one animation frame', async () => {
      const delay = delayAnimationFrames();

      await expect(delay).resolves.toBeUndefined();
    });

    it('Specifies the return value', async () => {
      const delay = delayAnimationFrames(2, 'value');

      await expect(delay).resolves.toBe('value');
    });

    it('Throws when provided invalid frames value', async () => {
      expect.assertions(2);

      await expect( delayAnimationFrames(null) ).rejects.toBeInstanceOf(Error);
      await expect( delayAnimationFrames(-1) ).rejects.toBeInstanceOf(Error);
    });
  });
});
