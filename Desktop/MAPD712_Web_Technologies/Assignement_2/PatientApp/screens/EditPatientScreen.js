//EditPatientScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditPatientScreen = ({ route, navigation }) => {
  const { patient } = route.params || {};

  const [name, setName] = useState(patient?.name || 'John Doe');
  const [age, setAge] = useState(patient?.age || '45');
  const [gender, setGender] = useState(patient?.gender || 'Male');

  const handleSave = () => {
    if (!name || !age || !gender) {
      alert('Please fill in all fields.');
      return;
    }
    
    if (isNaN(age) || age <= 0) {
      alert('Please enter a valid age.');
      return;
    }

    navigation.navigate('PatientDetails', { updatedPatient: { name, age, gender } });
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
