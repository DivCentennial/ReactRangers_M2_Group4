import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // For the chevron icon
import * as DocumentPicker from 'expo-document-picker'; // To pick documents
import {
    useFonts,
    Abel_400Regular,
} from '@expo-google-fonts/abel';

const MedicalRecordsScreen = ({ route }) => {
  // Load the fonts
  let [fontsLoaded] = useFonts({
    Abel_400Regular,
  });

  const { patient } = route.params;

  // Separate states for each accordion
  const [expandedECG, setExpandedECG] = useState(false);
  const [expandedBloodTest, setExpandedBloodTest] = useState(false);

  // Separate rotate values for each accordion
  const rotateValueECG = useRef(new Animated.Value(0)).current;
  const rotateValueBloodTest = useRef(new Animated.Value(0)).current;

  // Toggle function for ECG accordion
  const toggleAccordionECG = () => {
    setExpandedECG(!expandedECG);

    // Animate the chevron for ECG
    Animated.timing(rotateValueECG, {
      toValue: expandedECG ? 0 : 1, // Rotate between 0 and 1 (0 to 180 degrees)
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Toggle function for Blood Test accordion
  const toggleAccordionBloodTest = () => {
    setExpandedBloodTest(!expandedBloodTest);

    // Animate the chevron for Blood Test
    Animated.timing(rotateValueBloodTest, {
      toValue: expandedBloodTest ? 0 : 1, // Rotate between 0 and 1 (0 to 180 degrees)
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Interpolating rotation values to degrees
  const rotateChevronECG = rotateValueECG.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const rotateChevronBloodTest = rotateValueBloodTest.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Function to pick a file from the device
  const handleAddRecord = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // You can specify the type of file to be selected
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        Alert.alert('File Selected', `File name: ${result.name}`);
        // Process the file as needed
        console.log(result);
      }
    } catch (error) {
      console.error('Error picking a file: ', error);
      Alert.alert('Error', 'An error occurred while picking the file');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medical Records for {patient.name || 'John Doe'}</Text>

      {/* ECG Accordion Menu */}
      <TouchableOpacity style={styles.accordion} onPress={toggleAccordionECG}>
        <Text style={styles.accordionTitle}>ECG</Text>

        {/* Rotating Chevron Icon for ECG */}
        <Animated.View style={{ transform: [{ rotate: rotateChevronECG }] }}>
          <AntDesign name="down" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
      {expandedECG && (
        <View style={styles.accordionContent}>
          <Text>Condition: {patient.condition || 'Critical'}</Text>
          <Text>History: {patient.medicalHistory || 'Lorem ipsum sit dolor sit amet'}</Text>
        </View>
      )}

      {/* Blood Test Accordion Menu */}
      <TouchableOpacity style={styles.accordion} onPress={toggleAccordionBloodTest}>
        <Text style={styles.accordionTitle}>Blood Test</Text>

        {/* Rotating Chevron Icon for Blood Test */}
        <Animated.View style={{ transform: [{ rotate: rotateChevronBloodTest }] }}>
          <AntDesign name="down" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
      {expandedBloodTest && (
        <View style={styles.accordionContent}>
          <Text>Condition: {patient.condition || 'Critical'}</Text>
          <Text>History: {patient.medicalHistory || 'Lorem ipsum sit dolor sit amet'}</Text>
        </View>
      )}

      {/* Add Record Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddRecord}>
        <Text style={styles.addButtonText}>Add Record</Text>
      </TouchableOpacity>

      {/* Add more accordion items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  accordion: {
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row', // Align text and icon in row
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Abel_400Regular',
  },
  accordionContent: {
    padding: 15,
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Abel_400Regular'
  },
});

export default MedicalRecordsScreen;
