import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Video, { OnLoadData, OnProgressData } from 'react-native-video';
import localImages from './utils/localImages';

const {height, width} = Dimensions.get('screen');

interface PlayerProps {
  useDefaultControls?: boolean;
  source:
    | {
        uri?: string | undefined;
        headers?: {[key: string]: string} | undefined;
        type?: string | undefined;
      }
    | number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  seekTime?: number;
  duration: number; // in seconds
}

export default function VideoPlayer({
  useDefaultControls = false,
  source,
  contentContainerStyle = {width: 390},
  seekTime = 5,
  duration,
}: PlayerProps) {
  const [pause, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const player = useRef<any>(null);
  const pan = useRef<any>(new Animated.ValueXY()).current;
  const [value, setValue] = useState(0);

  const rotate180 = {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  };

  const _handlePause = () => {
    setPaused(!pause);
    // player.current.presentFullscreenPlayer()
  };
  const _handleProgress = (progress: OnProgressData) => {
    setCurrentTime(progress.currentTime);
  };
  const _handleFastForward = () => {
    player.current.seek(currentTime + seekTime);
  };
  const _handleBackward = () => {
    player.current.seek(currentTime - seekTime);
  };
  const _handleLoad = (progress: OnLoadData) => {
    // console.log('duration',progress.duration)
  };

  return (
    <View style={[styles.playerContainer, contentContainerStyle]}>
      <Video
        ref={player}
        source={source}
        style={styles.videoComp}
        fullscreen={false}
        fullscreenOrientation='landscape'
        fullscreenAutorotate
        paused={pause}
        // repeat
        // muted
        volume={10}
        // controls={true}
        controls={useDefaultControls}
        resizeMode={'contain'}
        ignoreSilentSwitch={'obey'}
        // allowsExternalPlayback
        // pictureInPicture={true}
        // playInBackground={true}
        // playWhenInactive={true}
        onProgress={_handleProgress}
        onLoad={_handleLoad}
      />

      {useDefaultControls ? null : (
        <View style={styles.controlsContainer}>
          <View style={[styles.controlButtonsContainer]}>
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={_handleBackward}>
              <Image
                source={localImages.FORWARD}
                style={[styles.playPauseIcon, rotate180]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.playPauseButton}
              onPress={_handlePause}>
              <Image
                source={pause ? localImages.PLAY : localImages.PAUSE}
                style={styles.playPauseIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={_handleFastForward}>
              <Image
                source={localImages.FORWARD}
                style={[styles.playPauseIcon]}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  playerContainer: {
    alignItems: 'center',
    width: 390,
  },
  videoComp: {
    height: '58.5%',
    width: '100%',
  },
  playPauseButton: {
    backgroundColor: '#000000',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  playPauseIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  controlsContainer: {
    width: '100%',
    //   backgroundColor: '#00000030',
  },
  controlButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  track: {
    height: 50,
    width: '100%',
    marginVertical: 5,
    backgroundColor: '#00000030',
  },
  box: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
});
