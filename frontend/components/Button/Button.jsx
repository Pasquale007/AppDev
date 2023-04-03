import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Button.style';

export default function Button({ text, onClick }) {
    return (
        <TouchableOpacity
            onPress={(e) => onClick(e)}
            style={styles.button}
        >
            <Text style={styles.seachText}>{text}</Text>
        </TouchableOpacity>
    );
}
