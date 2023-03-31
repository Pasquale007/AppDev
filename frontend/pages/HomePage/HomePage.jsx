import * as React from 'react';
import { View, Text } from 'react-native';
import styles from './HomePage.style';


export default function HomePage(){

    return(
        <View>
            <Text style={styles.homeText}>Home Page!</Text>
        </View>
    );
}