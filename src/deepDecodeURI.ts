/**
 * Repeatedly decode `uri` until decoding it no longer changes the value.
 *
 * @example
 * ```ts
 * deepDecodeURI('%2520'); // ' '
 * ```
 */
export function deepDecodeURI(uri: string): string {
  if (!uri.length) {
    return uri;
  }

  let prev = uri;
  let decoded = decodeURI(uri);

  while (decoded !== prev) {
    prev = decoded;
    decoded = decodeURI(decoded);
  }

  return decoded;
}
