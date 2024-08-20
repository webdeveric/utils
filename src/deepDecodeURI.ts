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
