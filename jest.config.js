module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  testPathIgnorePatterns: [],
  moduleNameMapper: {
    'main/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'vue'],
};
