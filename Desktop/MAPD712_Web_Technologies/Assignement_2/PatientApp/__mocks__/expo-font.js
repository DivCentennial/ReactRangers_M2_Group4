// __mocks__/expo-font.js
export const loadAsync = jest.fn(() => Promise.resolve());
export const useFonts = jest.fn(() => [true, null]);  // Return fonts loaded status
export const Abel_400Regular = 'Abel_400Regular';
