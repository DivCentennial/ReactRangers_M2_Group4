//DashboardScreen.js

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const patients = [
  { id: '1', name: 'Patient Name 1', status: 'Critical' },
  { id: '2', name: 'Patient Name 2', status: 'Stable' },
  { id: '3', name: 'Patient Name 3', status: 'Medium' },
  { id: '4', name: 'Patient Name 4', status: 'Critical' },
];

const DashboardScreen = ({ route }) => {
  const user = route?.params?.user || 'Healthworker'; 
  const designation = route?.params?.designation || ''; 

  const renderPatient = ({ item }) => (
    <View style={styles.patientRow}>
      <Text style={styles.patientName}>{item.name}</Text>
      <Text style={[styles.patientStatus, styles[item.status.toLowerCase()]]}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome {user}</Text>
      <Text style={styles.designation}>{designation}</Text>
      <FlatList
        data={patients}
        renderItem={renderPatient}
        keyExtractor={item => item.id}
      />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  designation: {
    fontSize: 18,
    marginBottom: 20,
    color: 'gray',
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
});

export default DashboardScreen;
