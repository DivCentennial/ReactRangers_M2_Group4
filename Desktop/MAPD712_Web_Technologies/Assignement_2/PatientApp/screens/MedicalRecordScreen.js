import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // For the chevron icon
import * as DocumentPicker from 'expo-document-picker'; // To pick documents
import { useFonts, Abel_400Regular } from '@expo-google-fonts/abel';

const MedicalRecordsScreen = ({ route }) => {
  // Load the fonts
  let [fontsLoaded] = useFonts({
    Abel_400Regular,
  });

  const { patient } = route.params;

  // Create an array of states for each accordion dynamically based on the number of medical reports
  const [expandedReports, setExpandedReports] = useState(patient.medicalReports.map(() => false));

  // Rotate values for each accordion dynamically
  const rotateValues = useRef(patient.medicalReports.map(() => new Animated.Value(0))).current;

  // Toggle function for any accordion
  const toggleAccordion = (index) => {
    const newExpandedReports = [...expandedReports];
    newExpandedReports[index] = !newExpandedReports[index];
    setExpandedReports(newExpandedReports);

    // Animate the chevron for the clicked accordion
    Animated.timing(rotateValues[index], {
      toValue: newExpandedReports[index] ? 1 : 0, // Rotate between 0 and 1 (0 to 180 degrees)
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Interpolating rotation values to degrees
  const rotateChevron = (index) => rotateValues[index].interpolate({
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

      {/* Dynamically render the accordion items */}
      {patient.medicalReports.map((report, index) => (
        <View key={index}>
          <TouchableOpacity style={styles.accordion} onPress={() => toggleAccordion(index)}>
            <Text style={styles.accordionTitle}>{report.type}</Text>

            {/* Rotating Chevron Icon for each report */}
            <Animated.View style={{ transform: [{ rotate: rotateChevron(index) }] }}>
              <AntDesign name="down" size={24} color="white" />
            </Animated.View>
          </TouchableOpacity>
          {expandedReports[index] && (
            <View style={styles.accordionContent}>
              <Text>Date: {report.date}</Text>
              <Text>Result: {report.result}</Text>
            </View>
          )}
        </View>
      ))}

      {/* Add Record Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddRecord}>
        <Text style={styles.addButtonText}>Add Record</Text>
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
