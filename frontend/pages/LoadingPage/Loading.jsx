import React from 'react';
import { Image, View } from 'react-native';
import styles from './Loading.styles';
import Giffile from '../../assets/loading-phrases/LoadingGif.gif';
import { Text } from 'react-native';
import {phrases} from '../../assets/loading-phrases/loadingPhrases';

export default function LoadingScreen({ loadingPhrases }) {

  return (
    <View style={styles.container}>
      <Image
        source={Giffile}
        style={styles.video}
        resizeMode="cover"
      />
      {loadingPhrases
        ? <Text>{phrases[Math.floor(Math.random() * phrases.length)].title}</Text>
        : <Text style={styles.text}>Flexi Flight</Text>}
    </View>
  );
}
