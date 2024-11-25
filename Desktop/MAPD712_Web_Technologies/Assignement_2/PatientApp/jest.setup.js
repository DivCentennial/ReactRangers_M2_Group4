import { Alert } from 'react-native';

// Mock Expo and related modules
jest.mock('expo-modules-core', () => ({
  NativeModulesProxy: {},
  requireNativeModule: jest.fn(),
  NativeModule: {},
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    AntDesign: (props) => null,
  };
});

jest.mock('expo-document-picker', () => ({
    getDocumentAsync: jest.fn().mockResolvedValue({
      type: 'success',
      name: 'test.pdf',
    }), // Mock the method to return a successful file pick result
  }));

jest.mock('@expo-google-fonts/abel', () => ({
  useFonts: jest.fn(() => [true]),
  Abel_400Regular: 'Abel_400Regular',
}));

// Mock Alert globally
jest.mock('react-native', () => {
  const actualReactNative = jest.requireActual('react-native');
  return {
    ...actualReactNative,
    Alert: {
      alert: jest.fn(),
    },
    NativeModules: {
      ...actualReactNative.NativeModules,
      SettingsManager: {},
    },
  };
});

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => {};
    return Reanimated;
  });

  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock fetch globally for API calls
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({}),
});
