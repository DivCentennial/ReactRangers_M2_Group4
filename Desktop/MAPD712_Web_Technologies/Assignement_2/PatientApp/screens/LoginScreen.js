//LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Here you can implement login logic
    navigation.navigate('Dashboard'); // Navigate to the Dashboard screen on login
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the SignUp screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sencare</Text>
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

      {/* Sign in button */}
      <View style={styles.buttonContainer}>
        <Button title="Sign in" onPress={handleLogin} />
      </View>

      {/* Sign up button */}
      <View style={styles.buttonContainer}>
        <Button title="Sign up" onPress={handleSignUp} />
      </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
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
  },
  buttonContainer: {
    width: '60%',
    marginTop: 20,
  },
});

export default LoginScreen;
