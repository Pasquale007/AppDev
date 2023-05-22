import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import styles from "./AlertCardLeftBg.styles";

function AlertCardLeftBg({ progress, dragX, id, onSearch }) {
    const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: "clamp"
    })

    return (
        <TouchableOpacity style={styles.container} onPress={() => onSearch(id)}>
            <Animated.View style={{transform: [{scale}]}} testID="searchIcon">
                <Ionicons style={styles.searchIcon} size={30} name="search" />
            </Animated.View>
            <Animated.Text style={[styles.text, { transform: [{ scale }] }]} testID="searchText">Anzeigen</Animated.Text>
        </TouchableOpacity>
    );
}

export default AlertCardLeftBg;