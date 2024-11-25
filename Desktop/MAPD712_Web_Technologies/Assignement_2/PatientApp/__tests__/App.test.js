global.setImmediate = (callback) => setTimeout(callback, 0);

// App.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

// Mocking expo-image-picker locally for this test file
jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(async () => ({
    cancelled: false,
    uri: 'mock-image-uri',
  })),
  requestMediaLibraryPermissionsAsync: jest.fn(async () => ({
    status: 'granted',
  })),
}));

describe('App Integration Test Suite', () => {
  test('renders the App component', () => {
    const { getByText } = render(<App />);
    expect(getByText('Login')).toBeTruthy(); // Ensure the Login screen renders
  });


//   test('navigates to Dashboard screen after successful login', () => {
//     const { getByText } = render(<App />);

//      // Simulate a button press to navigate to the Dashboard
//      const loginButton = getByText('Sign in'); // Replace with the actual text on the Login button
//      fireEvent.press(loginButton);
 
//      // Assert that the Dashboard screen is rendered
//      expect(getByText('Welcome Healthworker')).toBeTruthy(); // Replace 'Healthworker' with a test-specific user

//    });

//more screen validations to be added soon...

});
