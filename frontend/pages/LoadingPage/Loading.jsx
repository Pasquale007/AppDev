import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import styles from './Splash.styles';
import Giffile from '../../assets/loading-phrases/LoadingGif.gif';
import { Text } from 'react-native';

export default function LoadingScreen({ LoadingPhrases }) {

  useEffect(() => {
    setTimeout(() =>  4000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={Giffile}
        style={styles.video}
        resizeMode="cover"
      />
      if (LoadingPhrases==true) {
        
      }else{
      <Text style={styles.text}>Flexi Flight</Text>
}
    </View>
  );
}
