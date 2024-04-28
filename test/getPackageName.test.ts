import { describe, expect, it } from 'vitest';

import { getPackageName } from '../src/getPackageName.js';

describe('getPackageName()', () => {
  it('Returns the package name', () => {
    expect(getPackageName('fake-package')).toEqual('fake-package');
    expect(getPackageName('fake-package/other-path')).toEqual('fake-package');
    expect(getPackageName('@webdeveric/utils')).toEqual('@webdeveric/utils');
    expect(getPackageName('@webdeveric/utils/getPackageName')).toEqual('@webdeveric/utils');
  });

  it('Returns undefined for bad input', () => {
    expect(getPackageName('')).toBeUndefined();
    expect(getPackageName('../relative-path.js')).toBeUndefined();
  });
});
