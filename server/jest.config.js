module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '\\.test\\.ts$',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
};
