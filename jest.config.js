export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  testMatch: [
    "<rootDir>/tests/unit/**/*.test.js",
    "<rootDir>/tests/integration/**/*.test.js"
  ],
  collectCoverageFrom: [
    "src/server/**/*.js",
    "!src/server/index.js" // Excluir el servidor principal del coverage
  ],
  verbose: true
};