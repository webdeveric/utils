import { int32Max, int32Min } from '../numbers.js';

import type { Int32 } from '../types/numbers.js';

export function isInt32(input: unknown): input is Int32 {
  return typeof input === 'number' && Number.isInteger(input) && input >= int32Min && input <= int32Max;
}
