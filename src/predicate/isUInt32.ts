import { uInt32Max, uInt32Min } from '../numbers.js';

import type { UInt32 } from '../types/numbers.js';

export function isUInt32(input: unknown): input is UInt32 {
  return typeof input === 'number' && Number.isInteger(input) && input >= uInt32Min && input <= uInt32Max;
}
