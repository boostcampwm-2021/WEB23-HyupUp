module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@public(.*)$': '<rootDir>/public/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/__test__/svgTransform.js',
  },
  testEnvironment: 'jsdom',
  verbose: true,
};
