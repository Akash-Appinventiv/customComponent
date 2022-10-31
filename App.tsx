import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import VideoPlayer from './src/components/videoPlayer';

export default function App() {
  return (
    <SafeAreaView>
      <Text>App</Text>
      <VideoPlayer
        useDefaultControls={false}
        // source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
        source={{uri: 'https://mobilecdn.6thstreet.com/AllBanners/bmt/13-05-2022+Women/HL+Videos+for+women/footwear.mp4'}}
        // source={require('./src/assets/vid.mp4')}
        duration={15}
        contentContainerStyle = {{width: 300,}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
