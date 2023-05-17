import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Animated } from 'react-native';
import styles from "./AlertCardRightBg.styles";

function AlertCardRightBg({ dragX }) {
    const scale = dragX.interpolate({
        inputRange: [-125, 0],
        outputRange: [1, 0],
        extrapolate: "clamp"
    })

    return (
        <View style={styles.container} >
            <Animated.Text style={[styles.text, { transform: [{ scale }] }]} testID="deleteText">Löschen</Animated.Text>
            <Animated.View style={{transform: [{scale}]}} testID="deleteIcon">
                <Ionicons style={styles.trashIcon} size={30} name="trash"/>
            </Animated.View>
        </View>
    );
}

export default AlertCardRightBg;