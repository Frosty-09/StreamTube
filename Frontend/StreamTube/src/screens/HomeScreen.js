
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import api from '../api/api';
import VideoCard from '../components/VideoCard';

const HomeScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/videos');
        setVideos(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            onPress={() => navigation.navigate('VideoPlayer', { videoId: item._id })}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
