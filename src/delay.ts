export function delay<T = undefined>(ms: number, value?: T) : Promise<T>
{
  if ( ! Number.isInteger( ms ) ) {
    throw new Error('delay ms must be an integer');
  }

  return new Promise( resolve => setTimeout( resolve, ms, value ) );
}
