import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditPatientScreen = ({ route, navigation }) => {
  const { patient } = route.params || {};
  const previousStatus = patient.status
  const [name, setName] = useState(patient?.name || 'Null');
  const [age, setAge] = useState(patient?.age || 'Null');
  const [gender, setGender] = useState(patient?.gender || 'Null');
  const [status, setStatus] = useState(previousStatus);

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
        body: JSON.stringify({ name, age, gender, status }),
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

      <Text style={styles.label}>Status:</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)} // Update the gender state when a new value is selected
        style={styles.input}
      >
        <Picker.Item label="Stable" value="Stable" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="Critical" value="Critical" />
      </Picker>

      <TouchableOpacity style={styles.editButton} title="Save Changes" onPress={handleSave}>
      <Text style={styles.editButtonText}>Save Patient Details</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Abel_400Regular',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontFamily: 'Abel_400Regular',
  },
});

export default EditPatientScreen;
