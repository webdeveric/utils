module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  resolver: 'jest-ts-webcompat-resolver',
  testMatch: ['**/test/**/*.test.ts'],
};
