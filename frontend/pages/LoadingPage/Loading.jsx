import React from 'react';
import { Image, View } from 'react-native';
import styles from './Loading.styles';
import Giffile from '../../assets/loading-phrases/LoadingGif.gif';
import { Text } from 'react-native';
import {phrases} from '../../assets/loading-phrases/loadingPhrases';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ loadingPhrases }) {


    const [randomPhrase, setRandomPhrase] = useState('');
  
    useEffect(() => {
      if (loadingPhrases) {
        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * phrases.length);
          setRandomPhrase(phrases[randomIndex]);
        }, 5500);
  
        // Set initial random phrase immediately
        const initialRandomIndex = Math.floor(Math.random() * phrases.length);
        setRandomPhrase(phrases[initialRandomIndex]);
  
        return () => {
          clearInterval(interval);
        };
      }
    }, [loadingPhrases]);
  

  return (
    <View style={styles.container}>
      <Image
        source={Giffile}
        style={styles.video}
        resizeMode="cover"
      />
      {loadingPhrases
        ? <Text style={styles.phrases}>{randomPhrase}</Text>
        : <Text style={styles.text}>Flexi Flight</Text>}
    </View>
  );
}
