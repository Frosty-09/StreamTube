
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VideoPlayerScreen = ({ route }) => {
  const { videoId } = route.params;

  return (
    <View style={styles.container}>
      <Text>Video Player for video ID: {videoId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoPlayerScreen;
