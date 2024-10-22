import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const PatientDetailsScreen = ({ route }) => {
  // Safely access the patient data or use default values
  const patient = route?.params?.patient || { status: 'Unknown' };

  const dummyDetails = {
    department: patient.status === 'Critical' ? 'Intensive Care Unit (ICU)' : 'General Ward',
    gender: 'Male',  
    admissionDate: '2024-01-01',
    age: '45',  
    condition: patient.status,  
    medicalHistory: 'Diabetes, Hypertension'  
  };

  const handleEditDetails = () => {
    Alert.alert('Edit Patient', 'This feature is under development.');
  };

  return (
    <View style={styles.container}>
      {/* Patient Image */}
      <Image source={require('../assets/24.png')} style={styles.profileImage} />

      {/* Patient Details */}
      <Text style={styles.detailText}>Name: John Doe</Text>
      <Text style={styles.detailText}>ID: 12345</Text>
      <Text style={styles.detailText}>Department: {dummyDetails.department}</Text>
      <Text style={styles.detailText}>Gender: {dummyDetails.gender}</Text>
      <Text style={styles.detailText}>Admission Date: {dummyDetails.admissionDate}</Text>

      {/* Edit Details Button */}
      <TouchableOpacity style={styles.editButton} onPress={handleEditDetails}>
        <Text style={styles.editButtonText}>Edit Patient Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PatientDetailsScreen;
