module.exports = {
    preset: 'react-native',  // Keep 'react-native' preset for existing tests
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation|expo|expo-font|expo-document-picker|@expo/vector-icons)/)',
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Use Babel to transform JS/TS files
    },
    testEnvironment: 'jsdom',
  };
  