import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import DashboardScreen from '../screens/DashboardScreen';
import { NavigationContainer } from '@react-navigation/native';

// Mock the axios request
jest.mock('axios');

describe('DashboardScreen API functionality', () => {
  const mockRoute = {
    params: {
      user: 'Healthworker',
      designation: 'Doctor'
    }
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should display loading indicator while fetching patients', async () => {
    // Mock API response with a delay
    axios.get.mockResolvedValueOnce(new Promise((resolve) => setTimeout(() => resolve({ data: [] }), 500)));

    render(
      <NavigationContainer>
        <DashboardScreen route={mockRoute} />
      </NavigationContainer>
    );

    // Ensure the loading indicator is displayed
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();

    // Wait for loading to complete
    await waitFor(() => expect(screen.queryByTestId('loading-indicator')).toBeNull());
  });

  it('should render patients list after successful API call', async () => {
    // Mock successful API response
    const mockPatients = [
      { _id: '1', name: 'John Doe', status: 'Critical' },
      { _id: '2', name: 'Jane Smith', status: 'Stable' }
    ];
    axios.get.mockResolvedValueOnce({ data: mockPatients });

    render(
      <NavigationContainer>
        <DashboardScreen route={mockRoute} />
      </NavigationContainer>
    );

    // Wait for the patients data to be rendered
    await waitFor(() => screen.getByText('John Doe'));

    // Ensure the patient data is rendered correctly
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('Critical')).toBeTruthy();
    expect(screen.getByText('Jane Smith')).toBeTruthy();
    expect(screen.getByText('Stable')).toBeTruthy();
  });

  it('should show error message when API call fails', async () => {
    // Mock failed API response
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch patients'));

    render(
      <NavigationContainer>
        <DashboardScreen route={mockRoute} />
      </NavigationContainer>
    );

    // Wait for the error message to appear
    await waitFor(() => screen.getByText('Error: Failed to fetch patients'));

    // Ensure the error message is displayed
    expect(screen.getByText('Error: Failed to fetch patients')).toBeTruthy();
  });

  it('should toggle the filter dropdown visibility', async () => {
    // Mock a successful API response
    axios.get.mockResolvedValueOnce({ data: [] });
  
    render(
      <NavigationContainer>
        <DashboardScreen route={mockRoute} />
      </NavigationContainer>
    );
  
    // Wait for the loading indicator to disappear
    await waitFor(() => expect(screen.queryByTestId('loading-indicator')).toBeNull());
  
    // Ensure the "Add Filters: All" button is visible
    const filterButton = screen.getByText('Add Filters: All');
    expect(filterButton).toBeTruthy();
  
    // Open the dropdown
    fireEvent.press(filterButton);
  
    // Now the dropdown menu should be visible
    expect(screen.getByText('Show All')).toBeTruthy();
    expect(screen.getByText('Show Critical')).toBeTruthy();
    expect(screen.getByText('Show Stable')).toBeTruthy();
    expect(screen.getByText('Show Medium')).toBeTruthy();
  });
  

  it('should call fetchPatients when the screen is focused', async () => {
    // Mock API response
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <NavigationContainer>
        <DashboardScreen route={mockRoute} />
      </NavigationContainer>
    );

    // Simulate screen focus
    await waitFor(() => screen.getByTestId('loading-indicator'));

    // Ensure fetchPatients was called once
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
