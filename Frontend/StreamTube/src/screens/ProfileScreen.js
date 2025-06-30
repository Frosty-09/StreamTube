import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Avatar, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios'; // Make sure to install axios: npm install axios

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:8000/api/v1/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.data);
    } catch (error) {
      setUser(null);
      // Handle token expiration or invalid token, e.g., by logging out
      if (error.response && error.response.status === 401) {
        await handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    setUser(null);
    // Navigate to a public screen if desired, e.g., the home or login screen
    navigation.navigate('Login');
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Text size={80} label={user.fullName.charAt(0)} style={styles.avatar} />
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </Card.Content>
        </Card>
        <Button mode="contained" onPress={handleLogout} style={styles.button}>
          Logout
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guest</Text>
      <Text style={styles.subtitle}>Log in to see your profile.</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
      >
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginVertical: 20,
  },
  cardContent: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    marginBottom: 16,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 8,
  },
});

export default ProfileScreen;
