// AddPatientScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // For selecting photos

const AddPatientScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [department, setDepartment] = useState('');
  const [gender, setGender] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [photo, setPhoto] = useState(null); // For handling photo upload


  // Function to handle photo selection
  const handleAddPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // To maintain a square aspect ratio
      quality: 1,
    });

    if (!pickerResult.canceled) {
        //console.log('Photo URI:', pickerResult.uri); // Debugging the photo URI
        setPhoto(pickerResult.assets[0].uri); // Set the photo URI to state, assuming correct structure
      }
  };


  const handleSubmit = () => {
    // Handle patient addition logic here (e.g., API call)
    console.log({
      fullName,
      patientId,
      department,
      gender,
      admissionDate,
      dateOfBirth,
      photo,
    });
    // Navigate back to the dashboard after submission
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Patient</Text>

       {/* Photo Circle */}
       <TouchableOpacity onPress={handleAddPhoto} style={styles.photoContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <Text style={styles.photoPlaceholderText}>Tap to add photo</Text>
        )}
      </TouchableOpacity>
      
       {/* Add Photo Button */}
       <TouchableOpacity style={styles.photoButton} onPress={handleAddPhoto}>
        <Text style={styles.photoButtonText}>Add Photo</Text>
      </TouchableOpacity>

      {/* Full Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Patient ID Input */}
      <TextInput
        style={styles.input}
        placeholder="Patient ID"
        value={patientId}
        onChangeText={setPatientId}
      />

      {/* Department Input */}
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={department}
        onChangeText={setDepartment}
      />

        {/* Gender Selection (Radio Buttons) */}
        <View style={styles.radioGroup}>
        <Text style={styles.radioLabel}>Gender:</Text>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setGender('Male')}
        >
          <View
            style={[
              styles.radioCircle,
              gender === 'Male' && styles.selectedRadioCircle,
            ]}
          />
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setGender('Female')}
        >
          <View
            style={[
              styles.radioCircle,
              gender === 'Female' && styles.selectedRadioCircle,
            ]}
          />
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Admission Date Input */}
      <TextInput
        style={styles.input}
        placeholder="Admission Date"
        value={admissionDate}
        onChangeText={setAdmissionDate}
      />

      {/* Date of Birth Input */}
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />

       {/* Submit Button */}
       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    photoContainer: {
      alignSelf: 'center',
      marginBottom: 20,
      width: 120,
      height: 120,
      borderRadius: 60, // Circular
      backgroundColor: '#e0e0e0',
      justifyContent: 'center',
      alignItems: 'center',
    },
    photo: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    photoPlaceholderText: {
      color: 'gray',
      fontSize: 14,
    },
    photoButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
      alignItems: 'center',
    },
    photoButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'Abel_400Regular', // Custom font for the button text
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      radioLabel: {
        fontSize: 16,
        marginRight: 10,
      },
      radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
      },
      radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#007BFF',
        marginRight: 10,
      },
      selectedRadioCircle: {
        backgroundColor: '#007BFF',
      },
      radioText: {
        fontSize: 16,
      },
    submitButton: {
      backgroundColor: '#007BFF',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Abel_400Regular', // Custom font for the submit button
    },
  });
  

export default AddPatientScreen;
