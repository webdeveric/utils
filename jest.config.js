/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  resolver: 'jest-ts-webcompat-resolver',
  testMatch: ['**/test/**/*.test.ts'],
};
