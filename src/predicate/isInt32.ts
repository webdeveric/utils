import type { Int32 } from '../types/numbers.js';

export function isInt32(input: unknown): input is Int32 {
  const int32Min = -2_147_483_648;
  const int32Max = 2_147_483_647;

  return typeof input === 'number' && Number.isInteger(input) && input >= int32Min && input <= int32Max;
}
