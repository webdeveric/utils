import { isAnyObjectWith } from '../predicate/isAnyObjectWith.js';

export type GetNodeResult =
  | {
      value: unknown;
      found: true;
      visitedNodes: PropertyKey[];
    }
  | {
      value: undefined;
      found: false;
      visitedNodes: PropertyKey[];
    };

/**
 * Retrieves the value of a nested property from an object based on a sequence of keys.
 *
 * @internal
 */
export function getNode<Input extends object>(input: Input, pathKeys: Iterable<PropertyKey>): GetNodeResult {
  let current: unknown = input;

  const visitedNodes: PropertyKey[] = [];

  for (const key of pathKeys) {
    visitedNodes.push(key);

    if (isAnyObjectWith(current, key)) {
      current = current[key];
    } else {
      return {
        value: undefined,
        found: false,
        visitedNodes,
      };
    }
  }

  return {
    value: current,
    found: true,
    visitedNodes,
  };
}
