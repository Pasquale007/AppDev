import React from 'react';
import styles from "./AlertModalData.style";
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

function AlertModalData({ headline, data }) {
  return (
    <View style={styles.container}>
      {headline &&
        <View>
          <Entypo name="aircraft-take-off" size={30} />
          <Text style={styles.headline}>{headline}</Text>
        </View>
      }
      <Text style={styles.data}>{data}</Text>
    </View>
  )
}

export default AlertModalData