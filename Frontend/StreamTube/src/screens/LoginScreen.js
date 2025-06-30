
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/users/login', { username, email, password });
      await AsyncStorage.setItem('accessToken', response.data.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.data.refreshToken);
      // Reset navigation to the main app, landing on the Profile screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs', params: { screen: 'Profile' } }],
      });
    } catch (err) {
      setError('Invalid username/email or password');
    }
  };

  const handleGuest = () => {
    // Reset navigation to the main app, landing on the Home screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs', params: { screen: 'Home' } }],
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Username or Email"
        value={username || email}
        onChangeText={(text) => {
          if (text.includes('@')) {
            setEmail(text);
            setUsername('');
          } else {
            setUsername(text);
            setEmail('');
          }
        }}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('Register')} style={styles.button}>
        Go to Register
      </Button>
      <Button onPress={handleGuest} style={styles.button}>
        Continue as Guest
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default LoginScreen;
