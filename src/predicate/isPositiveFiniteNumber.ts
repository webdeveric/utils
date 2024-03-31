import { isFiniteNumber } from './isFiniteNumber.js';

export const isPositiveFiniteNumber = (input: unknown): input is number => isFiniteNumber(input) && input >= 0;
