import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
//import { useFonts, Abel_400Regular } from '@expo-google-fonts/abel';
import axios from 'axios';

const PatientDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load the fonts
  // let [fontsLoaded] = useFonts({
  //   Abel_400Regular,
  // });

  // Get patientId from the route params
  const { patientId } = route.params;

  useEffect(() => {
    const fetchPatientDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://patientdbrepo.onrender.com/api/patient/fetch/${patientId}`);
        setPatient(response.data);
      } catch (err) {
        setError('Failed to load patient details');
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatientDetails();
    }
  }, [patientId]);

  const handleEditDetails = () => {
    navigation.navigate('EditPatient', { patient: patient });
  };

  const handleViewMedicalRecords = () => {
    navigation.navigate('MedicalRecords', { patient });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" testID='loading-indicator'/>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!patient) {
    return <Text>No patient data available</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Patient Image */}
      <Image source={patient.image ? { uri: patient.image } : require('../assets/defaultPatientImage.png')} style={styles.profileImage} />


      {/* Patient Details */}
      <Text style={styles.detailText}>Name: {patient.name}</Text>
      <Text style={styles.detailText}>ID: {patient._id}</Text>
      <Text style={styles.detailText}>Department: {patient.department || 'General Ward'}</Text>
      <Text style={styles.detailText}>Gender: {patient.gender}</Text>
      <Text style={styles.detailText}>Admission Date: {patient.dateOfAdmission}</Text>

      {/* View Medical Records Button */}
      <TouchableOpacity style={styles.viewRecordsButton} onPress={handleViewMedicalRecords}>
        <Text style={styles.viewRecordsButtonText}>View Medical Records</Text>
      </TouchableOpacity>

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
    fontFamily: 'Abel_400Regular',
  },
  viewRecordsButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  viewRecordsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Abel_400Regular',
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
    fontFamily: 'Abel_400Regular',
  },
});

export default PatientDetailsScreen;
