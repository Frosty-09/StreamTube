
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import api from '../api/api';
import VideoCard from '../components/VideoCard';

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get(`/videos?query=${searchQuery}`);
        setVideos(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        label="Search videos"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />
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
    paddingTop: 16,
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default ExploreScreen;
