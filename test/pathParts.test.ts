import { describe, it, expect } from 'vitest';

import { pathParts } from '../src/pathParts.js';

describe('pathParts()', () => {
  it.each([
    ['role.0.job.title', ['role', '0', 'job', 'title']],
    ['role.0.job.title', ['role', '0', 'job', 'title']],
    ['role.0.job["title"]', ['role', '0', 'job', 'title']],
    ['role.0.job[title]', ['role', '0', 'job', 'title']],
    ['role["0"].job.title', ['role', '0', 'job', 'title']],
    ['role["0"].job.title', ['role', '0', 'job', 'title']],
    ['role["0"].job["title"]', ['role', '0', 'job', 'title']],
    ['role["0"].job[title]', ['role', '0', 'job', 'title']],
    ['role[0].job.title', ['role', '0', 'job', 'title']],
    ['role[0].job.title', ['role', '0', 'job', 'title']],
    ['role[0].job["title"]', ['role', '0', 'job', 'title']],
    ['role[0].job[title]', ['role', '0', 'job', 'title']],
  ])('returns an iterator of path parts: %s => %j', (input, expected) => {
    expect(Array.from(pathParts(input))).toEqual(expected);
  });

  it('returns input for non-string input', () => {
    expect(Array.from(pathParts(123))).toEqual([123]);
  });
});
