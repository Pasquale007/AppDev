import React from "react";
import styles from "./Splash.styles";
import videoFile from "../../assets/splashscreen/splash.mp4";
import Video from 'react-native-video';

export default function Splash({ setIsLoading }) {
  React.useEffect(() => {
    setTimeout(setIsLoading, 3000)
  }, [])

  return (
    <Video
      source={videoFile}
      style={styles.backgroundVideo}
      muted={true}
      repeat={true}
      resizeMode={'cover'}
      autoplay={true}
    />
  );
}
