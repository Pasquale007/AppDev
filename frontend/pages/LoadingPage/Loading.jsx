import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import styles from './Splash.styles';
import Giffile from '../../assets/loading-phrases/LoadingGif.gif';
import { Text } from 'react-native';
import LoadingPhrasesFile from '../../assets/loading-phrases/loadingPhrases';
const LoadingPhrases1= useState(false);

export default function LoadingScreen({ LoadingPhrases }) {
  LoadingPhrases1=LoadingPhrases;
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
      if (LoadingPhrases1==true) {
        <Text>{LoadingPhrasesFile[Math.floor(Math.random() * LoadingPhrasesFile.length)].title}</Text>
      }else{
      <Text style={styles.text}>Flexi Flight</Text>
}
    </View>
  );
}
