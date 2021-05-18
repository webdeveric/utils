export function delayAnimationFrame<T>(value?: T) : Promise<typeof value>
{
  return new Promise(resolve => {
    window.requestAnimationFrame( () => resolve(value) );
  });
}

export async function delayAnimationFrames<T>(frames = 1, value?: T) : Promise<typeof value>
{
  if ( ! Number.isInteger( frames ) || frames < 1 ) {
    throw new Error('frames must be a positive integer');
  }

  for ( let f = frames; f > 0 ; --f ) {
    await delayAnimationFrame();
  }

  return value;
}
