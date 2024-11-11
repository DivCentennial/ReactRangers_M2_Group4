import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const EditPatientScreen = ({ route, navigation }) => {
  const { patient } = route.params || {};
  const [name, setName] = useState(patient?.name || 'John Doe');
  const [age, setAge] = useState(patient?.age || '45');
  const [gender, setGender] = useState(patient?.gender || 'Male');

  const handleSave = async () => {
    if (!name || !age || !gender) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    
    if (isNaN(age) || age <= 0) {
      Alert.alert('Error', 'Please enter a valid age.');
      return;
    }
    //console.log("Updating patient ID:", patient._id);

    try {
      const response = await fetch(`https://patientdbrepo.onrender.com/api/patient/update/${patient._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, gender }),
      });
      //console.log("Response Status:", response.status); // Log response status

      const responseData = await response.json();
      //console.log("Response Data:", responseData); // Log response data

      if (response.ok) {
        Alert.alert('Success', 'Patient record updated successfully!');
        navigation.navigate('PatientDetails', { updatedPatient: { ...patient, name, age, gender } });
      } else {
        const errorData = await response.json();
        Alert.alert('Update Failed', errorData.message || 'Failed to update patient record.');
      }
    } catch (error) {

      console.error("Fetch Error:", error); // Log any fetch error
      Alert.alert('Error', 'An error occurred while updating the patient record.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      
      <Text style={styles.label}>Age:</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />

      <Text style={styles.label}>Gender:</Text>
      <TextInput style={styles.input} value={gender} onChangeText={setGender} />

      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default EditPatientScreen;
