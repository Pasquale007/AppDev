import React from 'react';
import styles from "./AlertModalData.style";
import { View, Text } from 'react-native';

function AlertModalData({ headline, data, icon }) {
  return (
    <View style={styles.container}>
      {headline &&
        <View style={styles.head}>
          {icon && icon}
          <Text style={styles.headline}>{headline}</Text>
        </View>
      }
      {data && <Text style={styles.data}>{data}</Text>}
    </View>
  )
}

export default AlertModalData