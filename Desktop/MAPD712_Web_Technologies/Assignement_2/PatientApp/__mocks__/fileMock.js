// __mocks__/fileMock.js
module.exports = 'mock-file';

// __mocks__/@expo/vector-icons.js
export const AntDesign = function(props) {
  return {
    ...props,
    type: 'AntDesign'
  };
};

// __mocks__/expo-document-picker.js
export const getDocumentAsync = jest.fn(() =>
  Promise.resolve({
    type: 'success',
    name: 'sample.pdf',
    uri: 'file://sample.pdf',
    size: 1234,
  })
);

export const types = {
  PLAIN_TEXT: 'public.plain-text',
  PDF: 'com.adobe.pdf',
};

// __mocks__/expo-font.js
export const loadAsync = jest.fn(() => Promise.resolve());

export const useFonts = jest.fn(() => [true, null]);

export const Abel_400Regular = 'Abel_400Regular';