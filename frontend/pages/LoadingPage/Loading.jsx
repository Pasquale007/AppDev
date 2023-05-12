import React from 'react';
import { Image, View } from 'react-native';
import styles from './Splash.styles';
import Giffile from '../../assets/loading-phrases/LoadingGif.gif';
import { Text } from 'react-native';
import LoadingPhrasesFile from '../../assets/loading-phrases/loadingPhrases';

export default function LoadingScreen({ loadingPhrases }) {

  return (
    <View style={styles.container}>
      <Image
        source={Giffile}
        style={styles.video}
        resizeMode="cover"
      />
      {loadingPhrases
        ? <Text>{LoadingPhrasesFile[Math.floor(Math.random() * LoadingPhrasesFile.length)].title}</Text>
        : <Text style={styles.text}>Flexi Flight</Text>}
    </View>
  );
}
