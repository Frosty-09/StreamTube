
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const VideoCard = ({ video, onpress }) => (
  <TouchableOpacity onPress={onpress}>
    <View style={styles.videoContainer}>
      <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title}>{video.title}</Text>
      <Text style={styles.channel}>{video.owner.username}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  videoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  channel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default VideoCard;
