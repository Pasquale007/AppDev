import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Videofile from '../../assets/splashscreen/splash.mp4';
import Video from 'react-native-video';

class SplashScreen extends Component {
  state = {
    opacity: new Animated.Value(1),
  };

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>
        {
             <Video source={Videofilenpm} // Pfad zu Ihrer mp4-Datei
             style={styles.videoBackground}
             muted={true}
             repeat={true}
             resizeMode='cover'
             rate={1.0}
             ignoreSilentSwitch='obey' />
        }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
