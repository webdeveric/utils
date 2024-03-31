import type { UnknownRecord } from '../types/records.js';

export const isObject = <T extends object = UnknownRecord>(input: unknown): input is T =>
  input !== null && typeof input === 'object' && !Array.isArray(input);
