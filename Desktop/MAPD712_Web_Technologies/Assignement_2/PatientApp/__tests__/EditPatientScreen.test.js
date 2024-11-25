import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import EditPatientScreen from '../screens/EditPatientScreen';

const mockRoute = {
  params: {
    patient: {
      _id: '1',
      name: 'John Doe',
      age: '30',
      gender: 'Male',
      status: 'Stable',
    },
  },
};

const mockNavigation = { navigate: jest.fn() };

// Mock the global fetch function
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        patient: {
          _id: '1',
          name: 'John Doe',
          age: '30',
          gender: 'Male',
          status: 'Stable',
        },
      }),
    })
  );
});

describe('EditPatientScreen', () => {
  it('renders without crashing', () => {
    render(<EditPatientScreen route={mockRoute} navigation={mockNavigation} />);

    // Check if the name input contains the name "John Doe"
    expect(screen.getByDisplayValue('John Doe')).toBeTruthy();
  });

  it('displays the patient data correctly', () => {
    render(<EditPatientScreen route={mockRoute} navigation={mockNavigation} />);

    // Check if the name, age, and gender are displayed correctly
    expect(screen.getByLabelText(/name/i)).toHaveProp('value', 'John Doe');
    expect(screen.getByLabelText(/age/i)).toHaveProp('value', '30');
  });

  it('fetches patient data from API and displays it correctly when save button is pressed', async () => {
    render(<EditPatientScreen route={mockRoute} navigation={mockNavigation} />);

    // Find the save button and simulate a press event
    const saveButton = screen.getByText('Save Patient Details');
    fireEvent.press(saveButton);

    // Wait for the mock fetch to resolve and check if it was called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1); // Ensure fetch was called once
    });

    // Ensure the patient data is correctly displayed after saving
    expect(screen.getByLabelText(/name/i)).toHaveProp('value', 'John Doe');
    expect(screen.getByLabelText(/age/i)).toHaveProp('value', '30');
  });
});
