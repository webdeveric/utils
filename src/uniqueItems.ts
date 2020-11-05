export function uniqueItems<T = unknown>( data: T[] ) : T[]
{
  return [ ...new Set<T>( data ) ];
}
