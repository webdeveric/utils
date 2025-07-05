/**
 * This function is used to create a type guard that always returns true, effectively allowing
 * the input to be treated as the specified type without any runtime checks.
 *
 * @privateRemarks
 * The `is` prefix is omitted because there is not any conditional logic in the function.
 * It is more of a command to `tsc` to assume the type rather than a check.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const assume = <Type>(_input: unknown, ..._args: any[]): _input is Type => true;
