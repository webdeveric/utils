import { describe, it, expect } from 'vitest';

import { toPascalCase } from '../src/toPascalCase.js';

describe('toPascalCase()', () => {
  it.each([
    ['!@#$%^&*()', ''],
    ['This is important!!!', 'ThisIsImportant'],
  ])('Removes non alphanumeric: "%s" => "%s"', (input, expected) => {
    expect(toPascalCase(input)).toBe(expected);
  });

  it.each([
    ['abc', 'Abc'],
    ['abc def', 'AbcDef'],
  ])('Handles one lowercase word: "%s" => "%s"', (input, expected) => {
    expect(toPascalCase(input)).toBe(expected);
  });

  it.each([
    ['SomeDLQ', 'SomeDLQ'],
    ['some UPPERCASE words', 'SomeUPPERCASEWords'],
    ['abc123DEF456', 'Abc123DEF456'],
  ])('Handles uppercase words: "%s" => "%s"', (input, expected) => {
    expect(toPascalCase(input)).toBe(expected);
  });

  it.each([
    ['something_happens_at_1200', 'SomethingHappensAt1200'],
    ['do_something_cool', 'DoSomethingCool'],
  ])('Handles snake case: "%s" => "%s"', (input, expected) => {
    expect(toPascalCase(input)).toBe(expected);
  });

  it.each([
    ['Bender: do a flip!', 'BenderDoAFlip'],
    ['doSomethingCool', 'DoSomethingCool'],
  ])('Handles camel case: "%s" => "%s"', (input, expected) => {
    expect(toPascalCase(input)).toBe(expected);
  });

  it.each([
    ['The quick brown fox jumps over the lazy dog.', 'TheQuickBrownFoxJumpsOverTheLazyDog'],
    ['Hello world! How are you today?', 'HelloWorldHowAreYouToday'],
  ])('Handles complex sentences: "%s" => "%s"', (input, expected) => {
    expect(toPascalCase(input)).toBe(expected);
  });

  it.each([
    ['abc123def', 'Abc123Def'],
    ['123abc456def', '123Abc456Def'],
  ])('Handles numbers: "%s" => "%s"', (input, expected) => {
    expect(toPascalCase(input)).toBe(expected);
  });

  it.each([
    // cspell:disable-next-line
    ["Didn't can't isn't would've", 'DidntCantIsntWouldve'],
    // cSpell:ignore TwasntShouldntve
    ["'twasn't shouldn't've", 'TwasntShouldntve'],
    // cSpell:ignore Twasnt123Shouldntve456
    ["'twasn't123shouldn't've!456", 'Twasnt123Shouldntve456'],
  ])('Handles apostrophe: "%s" => "%s"', (input, expected) => {
    expect(toPascalCase(input)).toBe(expected);
  });

  it('Supports custom word mapping', () => {
    const wordMap = {
      io: 'IO',
      id: 'Id',
    };

    expect(toPascalCase('disk_io', wordMap)).toBe('DiskIO');
    expect(toPascalCase('user_id', wordMap)).toBe('UserId');
    expect(toPascalCase('user_id', {})).toBe('UserId');
  });

  it('Coerces to String', () => {
    const expectations = new Map();

    expectations.set(null, 'Null');
    expectations.set(undefined, 'Undefined');
    expectations.set(true, 'True');
    expectations.set(false, 'False');
    expectations.set(1, '1');
    expectations.set(3.14, '314');
    expectations.set(BigInt(100), '100');
    expectations.set(Symbol('test'), 'SymbolTest');
    expectations.set([], '');
    expectations.set(['abc', 123], 'Abc123');
    expectations.set({}, 'ObjectObject');
    expectations.set(
      {
        toString() {
          return 'hello world';
        },
      },
      'HelloWorld',
    );
    expectations.set(new Map(), 'ObjectMap');
    expectations.set(new Set(), 'ObjectSet');

    for (const [input, output] of expectations) {
      expect(toPascalCase(input)).toBe(output);
    }
  });
});
