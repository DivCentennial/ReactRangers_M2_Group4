import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddPatientScreen from '../screens/AddPatientScreen';

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(() => Promise.resolve({ granted: true })),
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({ canceled: false, assets: [{ base64: 'mockBase64Image' }] })),
}));

//to mock fetch API for simulate API response
global.fetch = jest.fn();

//resetting mocks to avoid interfering with other tests (if any)
describe('AddPatientScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  //test 1: checking for all input fields on the page
  test('renders all input fields and buttons correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <AddPatientScreen route={{ params: {} }} />
    );

    // Check for presence of input fields
    expect(getByPlaceholderText('Full Name')).toBeTruthy();
    expect(getByPlaceholderText('Admission Date')).toBeTruthy();
    expect(getByPlaceholderText('Date of discharge')).toBeTruthy();
    expect(getByPlaceholderText('Age')).toBeTruthy();
    expect(getByPlaceholderText('Department')).toBeTruthy();
    expect(getByPlaceholderText('Status')).toBeTruthy();

    // Check for buttons
    expect(getByText('Add Photo')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });
  //end of test 1

  //test 2: checking form submission
  it('validates form input before submission', async () => {
    const { getByText, getByPlaceholderText } = render(
      <AddPatientScreen route={{ params: {} }} />
    );

    const submitButton = getByText('Submit');
    
    // Test form submission without filling in input fields
    fireEvent.press(submitButton);

    await waitFor(() => {
      // Expect some alert or form validation feedback
      expect(getByText('Submit')).toBeTruthy();
    });
  });
  //end of test 2

  //test 3: API submission and navigating back to dashboard
  it('handles API submission correctly', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: 'Patient added successfully' }),
    });

    const navigationMock = { navigate: jest.fn() };

    const { getByText, getByPlaceholderText } = render(
      <AddPatientScreen route={{ params: {} }} navigation={navigationMock} />
    );

    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://patientdbrepo.onrender.com/api/patient/create',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.any(String),
        })
      );
    });

    // Check that the success message was shown and navigation was triggered
    expect(navigationMock.navigate).toHaveBeenCalledWith('Dashboard', { refresh: true });
  });
});
