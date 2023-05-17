import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Animated } from 'react-native';
import styles from "./AlertCardLeftBg.styles";

function AlertCardLeftBg({ progress, dragX }) {
    const scale = dragX.interpolate({
        inputRange: [0, 125],
        outputRange: [0, 1],
        extrapolate: "clamp"
    })

    return (
        <View style={styles.container} >
            <Animated.View style={{transform: [{scale}]}} testID="searchIcon">
                <Ionicons style={styles.searchIcon} size={30} name="search" />
            </Animated.View>
            <Animated.Text style={[styles.text, { transform: [{ scale }] }]} testID="searchText">Anzeigen</Animated.Text>
        </View>
    );
}

export default AlertCardLeftBg;