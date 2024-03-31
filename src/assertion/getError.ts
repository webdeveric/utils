export function getError(error: string | Error): Error {
  return error instanceof Error ? error : new TypeError(error);
}
