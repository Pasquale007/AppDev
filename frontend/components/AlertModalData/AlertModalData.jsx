import React from 'react';
import styles from "./AlertModalData.style";
import { View, Text } from 'react-native';

function AlertModalData({headline, data}) {
  return (
    <View style={styles.container}>
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.data}>{data}</Text>
    </View>
  )
}

export default AlertModalData