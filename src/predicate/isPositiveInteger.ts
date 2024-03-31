import { isInteger } from './isInteger.js';

export const isPositiveInteger = (input: unknown): input is number => isInteger(input) && input >= 0;
