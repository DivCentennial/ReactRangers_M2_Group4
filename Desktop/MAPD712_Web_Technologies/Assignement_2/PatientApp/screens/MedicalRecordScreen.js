import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert, Modal, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MedicalRecordsScreen = ({ route }) => {
  const { patient = { name: 'John Doe', medicalReports: [] } } = route.params || {};

  const [medicalReports, setMedicalReports] = useState(patient.medicalReports);
  const [expandedReports, setExpandedReports] = useState(medicalReports.map(() => false));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newRecord, setNewRecord] = useState({ type: '', date: '', result: '' });
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const [filteredReports, setFilteredReports] = useState(medicalReports); // State for filtered reports

  // Initialize rotateValues based on the number of medical reports.
  const rotateValues = useRef(medicalReports.map(() => new Animated.Value(0))).current;

  const loadRecords = async () => {
    try {
      const savedReports = await AsyncStorage.getItem(`medicalReports_${patient.name}`);
      if (savedReports) {
        const parsedReports = JSON.parse(savedReports);
        setMedicalReports(parsedReports);
        setFilteredReports(parsedReports); // Initialize filtered reports
        rotateValues.length = parsedReports.length;
        parsedReports.forEach((_, index) => {
          if (rotateValues[index] === undefined) {
            rotateValues[index] = new Animated.Value(0);
          }
        });
      }
    } catch (error) {
      console.error('Failed to load records', error);
    }
  };


  
  useEffect(() => {
    loadRecords();
  }, []);

  useEffect(() => {
    if (medicalReports.length > 0) {
      saveRecords();
    }
  }, [medicalReports]);

  useEffect(() => {
    // Filter reports based on the search query
    const results = medicalReports.filter((report) =>
      report.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredReports(results);
  }, [searchQuery, medicalReports]);

  const saveRecords = async () => {
    try {
      await AsyncStorage.setItem(`medicalReports_${patient.name}`, JSON.stringify(medicalReports));
    } catch (error) {
      console.error('Failed to save records', error);
    }
  };

  const toggleAccordion = (index) => {
    const newExpandedReports = [...expandedReports];
    newExpandedReports[index] = !newExpandedReports[index];
    setExpandedReports(newExpandedReports);

    Animated.timing(rotateValues[index], {
      toValue: newExpandedReports[index] ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateChevron = (index) =>
    rotateValues[index]?.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    }) || '0deg';

  const calculateCondition = () => {
    const goodResults = medicalReports.filter((report) => report.result.toLowerCase() === 'good').length;
    const badResults = medicalReports.filter((report) => report.result.toLowerCase() === 'bad').length;

    if (goodResults > badResults) return 'Stable';
    if (badResults > goodResults) return 'Critical';
    return 'Medium';
  };

  const handleAddRecord = () => {
    if (!newRecord.type || !newRecord.date || !newRecord.result) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Validate date format (YYYY-MM-DD)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(newRecord.date)) {
    Alert.alert('Invalid Date', 'Please enter a valid date in the format YYYY-MM-DD.');
    return;
  }

    const updatedReports = [...medicalReports, newRecord];
    setMedicalReports(updatedReports);
    setFilteredReports(updatedReports); // Update filtered reports
    setExpandedReports([...expandedReports, false]);
    rotateValues.push(new Animated.Value(0));
    setNewRecord({ type: '', date: '', result: '' });
    setIsModalVisible(false);
  };

  const handleDeleteRecord = (index) => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this record?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedReports = [...medicalReports];
            updatedReports.splice(index, 1);
            setMedicalReports(updatedReports);
            setFilteredReports(updatedReports);
            setExpandedReports(updatedReports.map(() => false));
            rotateValues.splice(index, 1);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medical Records for {patient.name}</Text>
      <Text style={styles.condition}>Overall Condition: {calculateCondition()}</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search Tests"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {filteredReports.length === 0 ? (
        <Text style={styles.noRecordsText}>No records found</Text>
      ) : (
        filteredReports.map((report, index) => (
          <View key={index}>
            <TouchableOpacity style={styles.accordion} onPress={() => toggleAccordion(index)}>
              <Text style={styles.accordionTitle}>{report.type}</Text>
              <Animated.View style={{ transform: [{ rotate: rotateChevron(index) }] }}>
                <AntDesign name="down" size={24} color="white" />
              </Animated.View>
            </TouchableOpacity>
            {expandedReports[index] && (
              <View style={styles.accordionContent}>
                <Text>Date: {report.date}</Text>
                <Text>Result: {report.result}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRecord(index)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Record</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add Medical Record</Text>
            <TextInput
              placeholder="Test Type"
              style={styles.input}
              value={newRecord.type}
              onChangeText={(text) => setNewRecord({ ...newRecord, type: text })}
            />
            <TextInput
              placeholder="Date(YYYY-MM-DD)"
              style={styles.input}
              value={newRecord.date}
              onChangeText={(text) => setNewRecord({ ...newRecord, date: text })}
            />
            <TextInput
              placeholder="Result (Good/Bad)"
              style={styles.input}
              value={newRecord.result}
              onChangeText={(text) => setNewRecord({ ...newRecord, result: text })}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
              <Button title="Add" onPress={handleAddRecord} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  condition: { fontSize: 18, color: '#007BFF', marginBottom: 20 },
  searchBar: { borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 20 },
  noRecordsText: { fontSize: 16, textAlign: 'center', marginVertical: 20 },
  accordion: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#007BFF', borderRadius: 5, marginBottom: 10 },
  accordionTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  accordionContent: { padding: 15, backgroundColor: '#e9e9e9', borderRadius: 5 },
  addButton: { backgroundColor: '#28A745', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 },
  modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  deleteButton: { backgroundColor: '#FF4D4F', padding: 10, borderRadius: 5, marginTop: 10 },
  deleteButtonText: { color: 'white', fontWeight: 'bold' },
});

export default MedicalRecordsScreen;
