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
  