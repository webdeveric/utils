import type { AnyFunction } from './types/common.js';

export type DeepFreezeOptions = {
  filterProperties: Set<PropertyKey>;
  doNotFreeze: WeakSet<object>;
  frozen: WeakSet<object>;
};

/**
 * Deep freeze an object or array.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
export function deepFreeze<Input extends object>(
  input: Input,
  partialOptions: Partial<DeepFreezeOptions> = {},
): Readonly<Input> {
  const {
    filterProperties = new Set<PropertyKey>(['prototype', '__proto__']),
    doNotFreeze = new WeakSet(typeof globalThis !== 'undefined' ? [globalThis] : []),
    frozen = new WeakSet(),
  } = partialOptions;

  if (doNotFreeze.has(input)) {
    return input;
  }

  const shouldFreeze = (value: unknown): value is object | AnyFunction => {
    return ((value && typeof value === 'object') || typeof value === 'function') && !doNotFreeze.has(value);
  };

  const freeze = <InputObject extends object>(inputObject: InputObject): Readonly<InputObject> => {
    if (Array.isArray(inputObject)) {
      inputObject.forEach((item) => {
        if (shouldFreeze(item)) {
          freeze(item);
        }
      });
    } else {
      const properties = Reflect.ownKeys(inputObject).filter((prop) => !filterProperties.has(prop));

      for (const propertyKey of properties) {
        const propertyValue = Reflect.get(inputObject, propertyKey);

        if (shouldFreeze(propertyValue)) {
          freeze(propertyValue);
        }
      }
    }

    if (!frozen.has(inputObject)) {
      frozen.add(Object.freeze(inputObject));
    }

    return inputObject;
  };

  return freeze(input);
}
