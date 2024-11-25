import { render, screen } from '@testing-library/react-native';
import React from 'react';
import MedicalRecordsScreen from '../screens/MedicalRecordScreen'; // Adjust import as needed

test('should display "No records found" when there are no medical reports', () => {
  const patient = {
    name: 'Jane Doe',
    medicalReports: [], // No medical reports
  };
  
  // Mocking route.params
  const route = {
    params: {
      patient,
    },
  };

  render(<MedicalRecordsScreen route={route} />);

  // Check if "No records found" is displayed
  expect(screen.getByText('No records found')).toBeTruthy();
});

// test('should display error message when no patient data is provided', () => {
//   const route = {
//     params: {}, // Missing patient data
//   };

//   render(<MedicalRecordsScreen route={route} />);

//   // Check if the error message is displayed for missing data
//   expect(screen.getByText('Error: Patient data is missing')).toBeTruthy();
// });
