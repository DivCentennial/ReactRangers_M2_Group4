import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';

const DashboardScreen = ({ route }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(route.params?.user || 'Healthworker');
  const [designation, setDesignation] = useState(route.params?.designation || '');

  // Ensure that 'user' and 'designation' update only when route params change
  useEffect(() => {
    if (route.params?.user) setUser(route.params.user);
    if (route.params?.designation) setDesignation(route.params.designation);
  }, [route.params]);

  const profileImage = user === 'Divyanshoo'
    ? require('../assets/divyanshoo.jpg')
    : require('../assets/kashish.jpg');

  // State for patients, filter, loading, error handling, and search query
  const [patients, setPatients] = useState([]);
  const [filter, setFilter] = useState('All');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered patients list (both filter and search)
  const filteredPatients = patients.filter(patient => {
    const matchesFilter = filter === 'All' || patient.status === filter;
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Fetch patients from the API
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://patientdbrepo.onrender.com/api/patient/fetch');
      setPatients(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch patients when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchPatients();
    }, [])
  );

  const handlePatientPress = (patient) => {
    navigation.navigate('PatientDetails', { patientId: patient._id });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
    setDropdownVisible(false);
  };

  const handleAddPatient = () => {
    navigation.navigate('AddPatient', { user, designation });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" testID="loading-indicator" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const renderPatient = ({ item }) => (
    <TouchableOpacity onPress={() => handlePatientPress(item)}>
      <View style={styles.patientRow}>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={[styles.patientStatus, styles[item.status.toLowerCase()]]}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome {user}</Text>
        <Image source={profileImage} style={styles.profileImage} />
      </View>
      <Text style={styles.designation}>{designation}</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Patients"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter dropdown */}
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

      {/* FlatList for scrolling */}
      <FlatList
        data={filteredPatients}
        renderItem={renderPatient}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListContent}
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
  },
  designation: {
    fontSize: 18,
    marginBottom: 20,
    color: 'gray',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchBar: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 20,
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
    elevation: 2,
  },
  menuItem: {
    padding: 10,
    fontSize: 16,
  },
  columnHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
  },
  patientStatus: {
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
