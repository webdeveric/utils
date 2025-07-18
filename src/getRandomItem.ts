import { randomInt } from './randomInt.js';

import type { NonEmptyArray } from './types/arrays.js';

export function getRandomItem<Type>(input: NonEmptyArray<Type>): Type;

export function getRandomItem<Type>(input: Type[]): Type | undefined;

export function getRandomItem<Type>(input: Type[]): Type | undefined {
  switch (input.length) {
    case 0:
      return;
    case 1:
      return input[0];
    default:
      return input[randomInt(0, input.length)];
  }
}
