import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import styles from './Splash.styles';
import Giffile from '../../assets/splashscreen/splashscreen.gif';
import { Text } from 'react-native';

export default function Splash({ setIsLoading }) {

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 4000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={Giffile}
        style={styles.video}
        resizeMode="cover"
      />
      <Text style={styles.text}>Flexi Flight</Text>
    </View>
  );
}
