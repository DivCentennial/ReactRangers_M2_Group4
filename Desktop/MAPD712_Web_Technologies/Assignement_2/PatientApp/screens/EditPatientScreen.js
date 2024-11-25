import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditPatientScreen = ({ route, navigation }) => {
  const { patient } = route.params || {};

  // Error handling in case patient data isn't available
  if (!patient) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Error: Patient data is unavailable.</Text>
      </View>
    );
  }

  const previousStatus = patient.status;
  const [name, setName] = useState(patient?.name || 'Null');
  const [age, setAge] = useState(patient?.age || 'Null');
  const [gender, setGender] = useState(patient?.gender || 'Male');
  const [status, setStatus] = useState(previousStatus || 'Stable');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name || !age || !gender) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (isNaN(age) || age <= 0) {
      Alert.alert('Error', 'Please enter a valid age.');
      return;
    }

    if (isSaving) return; // Prevent duplicate requests
    setIsSaving(true);

    try {
      const response = await fetch(`https://patientdbrepo.onrender.com/api/patient/update/${patient._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, gender, status }),
      });

      const responseData = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Patient record updated successfully!');
        navigation.navigate('PatientDetails', {
          updatedPatient: { ...patient, name, age, gender, status },
        });
      } else {
        Alert.alert('Update Failed', responseData.message || 'Failed to update patient record.');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      Alert.alert('Error', 'An error occurred while updating the patient record.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAgeBlur = () => {
    if (isNaN(age) || age <= 0) {
      Alert.alert('Error', 'Please enter a valid age.');
      setAge(''); // Clear invalid input
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} accessibilityLabel="name" />

        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          onBlur={handleAgeBlur}
          accessibilityLabel="age"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.input}
          testID="gender-picker"
          accessibilityLabel="gender"
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>

        <Text style={styles.label}>Status:</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Stable" value="Stable" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Critical" value="Critical" />
        </Picker>

        <TouchableOpacity style={styles.editButton} onPress={handleSave}>
          <Text style={styles.editButtonText}>Save Patient Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontWeight: 'bold',
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
