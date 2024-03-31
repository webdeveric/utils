import { getError } from './getError.js';

export function assertExhaustive(_: never, error: string | Error = 'Failed exhaustive check'): never {
  throw getError(error);
}
