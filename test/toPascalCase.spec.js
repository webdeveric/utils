import { toPascalCase } from '../src/toPascalCase';

describe('toPascalCase()', () => {
  it('Removes non alphanumeric', () => {
    expect(toPascalCase('!@#$%^&*()')).toBe('');
  });

  it('Handles one lowercase word', () => {
    expect(toPascalCase('a')).toBe('A');
    expect(toPascalCase('word')).toBe('Word');
  });

  it('Handles snake case', () => {
    expect(toPascalCase('do_something_cool')).toBe('DoSomethingCool');
  });

  it('Handles camel case', () => {
    expect(toPascalCase('doSomethingCool')).toBe('DoSomethingCool');
  });

  it('Handles complex sentences', () => {
    expect(toPascalCase('Hello world! How are you today?')).toBe(
      'HelloWorldHowAreYouToday'
    );
  });

  it('Handles numbers', () => {
    expect(toPascalCase('abc123def')).toBe('Abc123Def');
  });

  it('Handles apostrophe', () => {
    /* cspell:disable-next-line */
    expect(toPascalCase('Didn\'t can\'t isn\'t would\'ve')).toBe('DidntCantIsntWouldve');
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

    expectations.set( null, 'Null' );
    expectations.set( undefined, 'Undefined' );
    expectations.set( true, 'True' );
    expectations.set( false, 'False' );
    expectations.set( 1, '1' );
    expectations.set( 3.14, '314' );
    expectations.set( BigInt(100), '100' );
    expectations.set( Symbol('test'), 'SymbolTest' );
    expectations.set( [], '' );
    expectations.set( [ 'abc', 123 ], 'Abc123' );
    expectations.set( {}, 'ObjectObject' );
    expectations.set( { toString() { return 'hello world'; } }, 'HelloWorld' );
    expectations.set( new Map(), 'ObjectMap' );
    expectations.set( new Set(), 'ObjectSet' );

    for ( const [ input, output ] of expectations ) {
      expect(toPascalCase(input)).toBe(output);
    }
  });
});
