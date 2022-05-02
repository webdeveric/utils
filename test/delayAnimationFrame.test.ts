import { delayAnimationFrame, delayAnimationFrames } from '../src/delayAnimationFrame';

describe('delay animation frames', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => setTimeout(cb, 0));
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
    it('delays the specified number of times', async () => {
      const frameCount = 10;

      await expect(delayAnimationFrames(frameCount, 'value')).resolves.toBe('value');

      expect(window.requestAnimationFrame).toHaveBeenCalledTimes(frameCount);
    });

    it('Specifies the return value', async () => {
      const delay = delayAnimationFrames(1, true);

      await expect(delay).resolves.toBe(true);
    });

    it('Rejects when provided invalid frames value', async () => {
      expect.assertions(2);

      await expect(delayAnimationFrames(null as unknown as number)).rejects.toBeInstanceOf(Error);
      await expect(delayAnimationFrames(-1)).rejects.toBeInstanceOf(Error);
    });
  });
});
