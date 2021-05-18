export function delay<T>(ms: number, value?: T) : Promise<typeof value>
{
  if ( ! Number.isInteger( ms ) || ms < 0 ) {
    throw new Error('ms must be a positive integer');
  }

  return new Promise( resolve => setTimeout( resolve, ms, value ) );
}
