export function asArray<T = unknown>( data: T | T[] ) : T[]
{
  return Array.isArray( data ) ? data : [ data ];
}
