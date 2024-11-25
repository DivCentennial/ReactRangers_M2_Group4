import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import PatientDetailsScreen from '../screens/PatientDetailsScreen'; // Adjust the path as needed
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';

// Mocking axios
jest.mock('axios');

describe('PatientDetailsScreen API functionality', () => {

  const mockNavigation = {
    navigate: jest.fn(),
  };

  const route = {
    params: { patientId: '123' },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should display loading indicator while data is being fetched', () => {
    axios.get.mockResolvedValueOnce({ data: {} }); // Mock successful API call
    render(
      <NavigationContainer>
        <PatientDetailsScreen route={route} />
      </NavigationContainer>
    );

    // Assert that loading spinner is displayed
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  test('should display patient details when data is fetched successfully', async () => {
    // Mock successful API response
    const patientData = {
      name: 'Jane Doe',
      _id: '123',
      department: 'Cardiology',
      gender: 'Female',
      dateOfAdmission: '2024-01-01',
      image: 'https://example.com/image.jpg',
    };

    axios.get.mockResolvedValueOnce({ data: patientData });

    render(
      <NavigationContainer>
        <PatientDetailsScreen route={route} />
      </NavigationContainer>
    );

    // Wait for the patient details to be displayed
    await waitFor(() => screen.getByText('Name: Jane Doe'));

    // Assert that the correct patient details are displayed
    expect(screen.getByText('Name: Jane Doe')).toBeTruthy();
    expect(screen.getByText('ID: 123')).toBeTruthy();
    expect(screen.getByText('Department: Cardiology')).toBeTruthy();
    expect(screen.getByText('Gender: Female')).toBeTruthy();
    expect(screen.getByText('Admission Date: 2024-01-01')).toBeTruthy();
  });

  test('should display error message when the API request fails', async () => {
    // Mock failed API response
    axios.get.mockRejectedValueOnce(new Error('Failed to load patient details'));

    render(
      <NavigationContainer>
        <PatientDetailsScreen route={route} />
      </NavigationContainer>
    );

    // Wait for the error message to appear
    await waitFor(() => screen.getByText('Error: Failed to load patient details'));

    // Assert that the error message is displayed
    expect(screen.getByText('Error: Failed to load patient details')).toBeTruthy();
  });

  test('should display "No patient data available" when patient data is not found', async () => {
    // Mock API response with no patient data
    axios.get.mockResolvedValueOnce({ data: null });

    render(
      <NavigationContainer>
        <PatientDetailsScreen route={route} />
      </NavigationContainer>
    );

    // Wait for the "No patient data available" message
    await waitFor(() => screen.getByText('No patient data available'));

    // Assert that the "No patient data available" message is displayed
    expect(screen.getByText('No patient data available')).toBeTruthy();
  });
});
