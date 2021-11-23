module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@public(.*)$': '<rootDir>/public/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
  },
};
