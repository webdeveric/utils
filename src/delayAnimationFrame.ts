export function delayAnimationFrame<T>(value?: T) : Promise<typeof value>
{
  return new Promise(resolve => window.requestAnimationFrame( () => resolve(value) ) );
}

export function delayAnimationFrames<T>(frames: number, value?: T): Promise<typeof value>
{
  return new Promise( (resolve, reject) => {
    if ( ! Number.isInteger(frames) || frames < 1 ) {
      reject( new Error('frames must be a positive integer') );

      return;
    }

    const loop = (f: number): void => {
      if ( f === 0 ) {
        resolve(value);

        return;
      }

      window.requestAnimationFrame(() => loop(f - 1));
    };

    loop(frames);
  });
}
