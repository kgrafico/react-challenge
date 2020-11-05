module.export = {
  verbose: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  collectCoverage: true,
  coverageDirectory: '.coverage',
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/vendor/**'],
  testMatch: 'src/.*\\.(js|jsx)$'
};
