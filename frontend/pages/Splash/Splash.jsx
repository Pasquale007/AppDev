import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Video from 'react-native-video';
import Videofile from '../../assets/splashscreen/splash.mp4';

export default function Splash({ setIsLoading }) {
  const [opacity, setOpacity] = useState(new Animated.Value(1));

  const handleLoad = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const videoTimer = setTimeout(() => {
      handleLoad();
      setTimeout(() => setIsLoading(false), 2000);
    }, 1000);
    return () => clearTimeout(videoTimer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Video
        source={Videofile}
        style={styles.videoBackground}
        muted={true}
        resizeMode='cover'
        onLoad={handleLoad}
        onEnd={() => setIsLoading(false)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
