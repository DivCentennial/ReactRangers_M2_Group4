//LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import logo from "../assets/sencare-high-resolution-logo.png"
import * as Font from 'expo-font';
import {
  useFonts,
  Abel_400Regular,
} from '@expo-google-fonts/abel';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

// Load the fonts
let [fontsLoaded] = useFonts({
  Abel_400Regular
});

  const handleLogin = () => {
    // Define valid credentials and their designations
    const validUsers = {
      Divyanshoo: { password: '1234', designation: 'Nurse' },
      Kashish: { password: '1234', designation: 'Doctor' },
    };
  
    if (validUsers[username] && validUsers[username].password === password) {
      // If the credentials are correct, navigate to the Dashboard and pass the username and designation
      navigation.navigate('Dashboard', { user: username, designation: validUsers[username].designation });
    } else {
      // Handle invalid login case (e.g., show an alert)
      alert('Invalid username or password');
    }
  };
  
  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the SignUp screen
  };


  return (
    <View style={styles.container}>
      {/* <Text style={styles.logo}>Sencare</Text> */}

       {/* Replace the Text with the SVG Logo */}
       <Image source={logo} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.forgot}>Forgot Username or Password?</Text>

      {/* Sign in button using TouchableOpacity */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      {/* Sign up button using TouchableOpacity */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 100,
    borderRadius: 25, // Adjust this value for more or less rounding
    overflow: 'hidden', // This helps to clip any overflow content
    resizeMode: 'contain', // Maintain aspect ratio
    marginBottom: 20
},

  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  forgot: {
    color: 'blue',
    marginVertical: 10,
    fontFamily: 'Abel_400Regular',
  },
  buttonContainer: {
    width: '60%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Abel_400Regular', // Font applied to button text
    fontSize: 16,
  }
});

export default LoginScreen;
