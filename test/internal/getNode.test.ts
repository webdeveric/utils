import { describe, it, expect } from 'vitest';

import { getNode } from '../../src/internal/getNode.js';

describe('getNode()', () => {
  it('Gets a node from an object', () => {
    const data = {
      job: { title: 'tester' },
    };

    expect(getNode(data, ['job', 'title'])).toEqual({
      value: 'tester',
      found: true,
      visitedNodes: ['job', 'title'],
    });
  });

  it('Returns the input when no node names are provided', () => {
    const data = { name: 'test' };

    const result = getNode(data, []);

    expect(result).toEqual({
      value: data,
      found: true,
      visitedNodes: [],
    });

    expect(result.value).toBe(data);
  });

  it('Returns a reference to nested objects', () => {
    const job = { title: 'tester' };
    const data = { job };

    expect(getNode(data, ['job']).value).toBe(job);
  });

  it('Gets nodes from arrays', () => {
    const data = {
      items: [{ id: 1 }, { id: 2 }],
    };

    expect(getNode(data, ['items', 1, 'id'])).toEqual({
      value: 2,
      found: true,
      visitedNodes: ['items', 1, 'id'],
    });

    expect(getNode(data, ['items', '0', 'id'])).toEqual({
      value: 1,
      found: true,
      visitedNodes: ['items', '0', 'id'],
    });
  });

  it('Gets nodes using symbol keys', () => {
    const key = Symbol('key');
    const data = {
      [key]: { value: true },
    };

    expect(getNode(data, [key, 'value'])).toEqual({
      value: true,
      found: true,
      visitedNodes: [key, 'value'],
    });
  });

  it('Finds nodes whose value is undefined or null', () => {
    const data = {
      a: undefined,
      b: null,
    };

    expect(getNode(data, ['a'])).toEqual({
      value: undefined,
      found: true,
      visitedNodes: ['a'],
    });

    expect(getNode(data, ['b'])).toEqual({
      value: null,
      found: true,
      visitedNodes: ['b'],
    });
  });

  it('Includes inherited properties', () => {
    const data = Object.create({ inherited: 'value' });

    expect(getNode(data, ['inherited'])).toEqual({
      value: 'value',
      found: true,
      visitedNodes: ['inherited'],
    });
  });

  it('Accepts any iterable of node names', () => {
    const data = {
      a: { b: { c: 'c' } },
    };

    function* names(): Generator<PropertyKey> {
      yield 'a';
      yield 'b';
      yield 'c';
    }

    expect(getNode(data, names())).toEqual({
      value: 'c',
      found: true,
      visitedNodes: ['a', 'b', 'c'],
    });

    expect(getNode(data, new Set(['a', 'b']))).toEqual({
      value: { c: 'c' },
      found: true,
      visitedNodes: ['a', 'b'],
    });
  });

  describe('Not found', () => {
    it('Returns not found when a property does not exist', () => {
      const data = {
        job: { title: 'tester' },
      };

      expect(getNode(data, ['job', 'salary'])).toEqual({
        value: undefined,
        found: false,
        visitedNodes: ['job', 'salary'],
      });
    });

    it('Stops at the first missing node', () => {
      const data = {
        job: { title: 'tester' },
      };

      expect(getNode(data, ['company', 'name', 'length'])).toEqual({
        value: undefined,
        found: false,
        visitedNodes: ['company'],
      });
    });

    it('Returns not found when traversing through null or undefined', () => {
      const data = {
        a: null,
        b: undefined,
      };

      expect(getNode(data, ['a', 'b'])).toEqual({
        value: undefined,
        found: false,
        visitedNodes: ['a', 'b'],
      });

      expect(getNode(data, ['b', 'c'])).toEqual({
        value: undefined,
        found: false,
        visitedNodes: ['b', 'c'],
      });
    });

    it('Does not traverse into primitive values', () => {
      const data = {
        name: 'test',
        count: 1,
      };

      expect(getNode(data, ['name', 'length'])).toEqual({
        value: undefined,
        found: false,
        visitedNodes: ['name', 'length'],
      });

      expect(getNode(data, ['count', 'toFixed'])).toEqual({
        value: undefined,
        found: false,
        visitedNodes: ['count', 'toFixed'],
      });
    });

    it('Does not traverse into functions', () => {
      const data = {
        fn: Object.assign(() => {}, { prop: true }),
      };

      expect(getNode(data, ['fn', 'prop'])).toEqual({
        value: undefined,
        found: false,
        visitedNodes: ['fn', 'prop'],
      });
    });

    it('Returns not found for out of bounds array indexes', () => {
      const data = {
        items: ['a'],
      };

      expect(getNode(data, ['items', 1])).toEqual({
        value: undefined,
        found: false,
        visitedNodes: ['items', 1],
      });
    });
  });
});
