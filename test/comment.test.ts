import { describe, it, expect } from 'vitest';

import { comment } from '../src/comment.js';

describe('comment()', () => {
  it('Empty input returns an empty string', () => {
    expect(comment('')).toEqual('');
  });

  it('Trims whitespace at start of lines', () => {
    expect(
      comment(`
        test
      `),
    ).toEqual('/**\n * test\n */');
  });

  describe('options', () => {
    describe('type', () => {
      it('Block', () => {
        expect(comment('test')).toEqual('/**\n * test\n */');

        expect(
          comment('test', {
            type: 'block',
          }),
        ).toEqual('/**\n * test\n */');
      });

      it('Legal', () => {
        expect(comment('test')).toEqual('/**\n * test\n */');

        expect(
          comment('test', {
            type: 'legal',
          }),
        ).toEqual('/*!\n * test\n */');
      });

      it('Single', () => {
        expect(
          comment('test', {
            type: 'single',
          }),
        ).toEqual('// test');
      });

      it('HTML', () => {
        expect(
          comment('test', {
            type: 'html',
          }),
        ).toEqual('<!-- test -->');
      });
    });

    it('Can customize wrapper characters', () => {
      expect(
        comment('test', {
          commentStart: 'COMMENT-START\n',
          commentEnd: '\nCOMMENT-END',
          lineStart: 'LINE-START ',
          lineEnd: ' LINE-END',
        }),
      ).toEqual('COMMENT-START\nLINE-START test LINE-END\nCOMMENT-END');
    });
  });
});
