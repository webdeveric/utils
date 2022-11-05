import { isNumericValueArray } from './type-predicate.js';
import type { NumericValue } from './types.js';

export function assertIsInteger(input: unknown): asserts input is number {
  if (!Number.isInteger(input)) {
    throw new TypeError('input is not an integer');
  }
}

export function assertIsFiniteNumber(input: unknown): asserts input is number {
  if (!Number.isFinite(input)) {
    throw new TypeError('input is not a finite number');
  }
}

export function assertIsNumericValueArray(input: unknown): asserts input is NumericValue[] {
  if (!isNumericValueArray(input)) {
    throw new TypeError('all items must be a NumericValue');
  }
}
