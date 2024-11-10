// AddPatientScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // For selecting photos

const AddPatientScreen = ({ navigation, route }) => {
  const { user, designation } = route.params;

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dateOfDischarge, setDateOfDischarge] = useState('');
  const [department, setDepartment] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfAdmission, setAdmissionDate] = useState('');
  const [status, setStatus] = useState('');
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
      base64: true,
    });

    if (!pickerResult.canceled) {
        //console.log('Photo URI:', pickerResult.uri); // Debugging the photo URI
        setPhoto(pickerResult.assets[0].base64); // Set the photo URI to state, assuming correct structure
      }
  };

//Handling form submission
    const handleSubmit = async () => {
      try {
        const response = await fetch('https://patientdbrepo.onrender.com/api/patient/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            department,
            gender,
            dateOfAdmission,
            dateOfDischarge,
            age,
            status,
            photo, // Sending photo URI as well (you might need to handle photo differently if you want to upload it)
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.log("Error details:", errorData);
          throw new Error('Failed to add patient');
        }
  
        const result = await response.json();
        console.log("Response:", result);
        Alert.alert('Success', 'Patient added successfully!');
        //navigation.goBack();
        navigation.navigate('Dashboard', { refresh: true, user: user, designation: designation });

      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to add patient');
      }
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
        value={name}
        onChangeText={setName}
      />
      {/* Admission Date Input */}
      <TextInput
        style={styles.input}
        placeholder="Admission Date"
        value={dateOfAdmission}
        onChangeText={setAdmissionDate}
      />
      {/* Date of discharge  */}
      <TextInput
        style={styles.input}
        placeholder="Date of discharge"
        value={dateOfDischarge}
        onChangeText={setDateOfDischarge}
      />
        {/* Age */}
        <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
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

     

      {/* Date of Birth Input */}
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
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
