import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Video from 'react-native-video';
import Videofile from '../../assets/splashscreen/splash.mp4';

export default function Splash({setIsLoading}){
  state = {
    opacity: new Animated.Value(1),
  };
 


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



  React.useEffect(()=>{
    setTimeout(setIsLoading, 2000)
  },[])

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 2000, // Anzeigedauer des Videos in Millisekunden
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>
        
        <Video
          source={Videofile}
          style={styles.videoBackground}
          muted={true}
          resizeMode='cover'
        />
      </Animated.View>
    );
  }
}
}
