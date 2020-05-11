export function delay(ms, value)
{
  if ( ! Number.isInteger( ms ) ) {
    throw new Error('delay ms must be an integer');
  }

  return new Promise( resolve => setTimeout( resolve, ms, value ) );
}
