//DashboardScreen.js

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import {
  useFonts,
  Abel_400Regular
} from '@expo-google-fonts/abel';


const patients = [
  { id: '1', name: 'Patient Name 1', status: 'Critical' },
  { id: '2', name: 'Patient Name 2', status: 'Stable' },
  { id: '3', name: 'Patient Name 3', status: 'Medium' },
  { id: '4', name: 'Patient Name 4', status: 'Critical' },
];

const DashboardScreen = ({ route }) => {

  // Adding instance of navigation
  const navigation = useNavigation();

  const user = route?.params?.user || 'Healthworker'; 
  const designation = route?.params?.designation || ''; 

  // Load the fonts
let [fontsLoaded] = useFonts({
  Abel_400Regular
});

const profileImage = user === 'Divyanshoo'
? require('../assets/divyanshoo.jpg')
: require('../assets/kashish.jpg'); 

// State to manage the filter
const [filter, setFilter] = useState('All');
const [dropdownVisible, setDropdownVisible] = useState(false);

 // Filter function
 const filteredPatients = filter === 'All' ? patients : patients.filter(patient => patient.status === filter);

 //handle patient click
 const handlePatientPress = (patient) => {
  navigation.navigate('PatientDetails', { patient });
};

  const renderPatient = ({ item }) => (
    <TouchableOpacity onPress={() => handlePatientPress(item)}>
    <View style={styles.patientRow}>
      <Text style={styles.patientName}>{item.name}</Text>
      <Text style={[styles.patientStatus, styles[item.status.toLowerCase()]]}>{item.status}</Text>
    </View>
  </TouchableOpacity>
  );

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
    setDropdownVisible(false); // Hide dropdown after selection
  };

  const handleAddPatient = () => {
    // Add your patient addition logic here
    // Alert.alert("Add Patient", "Functionality to add a patient will be implemented.");

    navigation.navigate('AddPatient');
  };

  return (
    <View style={styles.container}>
     <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome {user}</Text>
        <Image source={profileImage} style={styles.profileImage} />
      </View>
      <Text style={styles.designation}>{designation}</Text>
       {/* Add Filters dropdown */}
       <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Text style={styles.dropdownText}>Add Filters: {filter}</Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity onPress={() => handleFilterSelect('All')}>
              <Text style={styles.menuItem}>Show All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterSelect('Critical')}>
              <Text style={styles.menuItem}>Show Critical</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterSelect('Stable')}>
              <Text style={styles.menuItem}>Show Stable</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterSelect('Medium')}>
              <Text style={styles.menuItem}>Show Medium</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Column headers */}
      <View style={styles.columnHeaders}>
        <Text style={styles.columnHeader}>Patient Name:</Text>
        <Text style={styles.columnHeader}>Patient Criticality:</Text>
      </View>

      <FlatList
        data={filteredPatients}
        renderItem={renderPatient}
        keyExtractor={item => item.id}
      />

       {/* Add Patient Button */}
       <TouchableOpacity style={styles.addButton} onPress={handleAddPatient}>
        <Text style={styles.addButtonText}>Add Patient</Text>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: 'Abel_400Regular'
  },
  designation: {
    fontSize: 18,
    marginBottom: 20,
    color: 'gray',
    fontFamily: 'Abel_400Regular',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  filterContainer: {
    marginBottom: 20, // Adds space below the filter
  },
  dropdown: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
    elevation: 2, // Adds shadow effect on Android
  },
  menuItem: {
    padding: 10,
    fontSize: 16,
  },
  columnHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontFamily: 'Abel_400Regular'
  },
  patientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  patientName: {
    fontSize: 18,
    fontFamily: 'Abel_400Regular'
  },
  patientStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Abel_400Regular'
  },
  critical: {
    color: 'red',
  },
  stable: {
    color: 'green',
  },
  medium: {
    color: 'orange',
  },
  addButton: {
    backgroundColor: '#007BFF', // Primary color for the button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20, // Space above the button
    
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Abel_400Regular'
  },
});

export default DashboardScreen;
