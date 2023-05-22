import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import styles from "./AlertCardRightBg.styles";

function AlertCardRightBg({ progress, dragX, id, onDelete }) {
    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: "clamp"
    })

    return (
        <TouchableOpacity style={styles.container} onPress={() => onDelete(id)}>
            <Animated.View style={{ transform: [{ scale }] }} testID="deleteIcon">
                <Ionicons style={styles.trashIcon} size={30} name="trash" />
            </Animated.View>
            <Animated.Text style={[styles.text, { transform: [{ scale }] }]} testID="deleteText">Löschen</Animated.Text>
        </TouchableOpacity>
    );
}

export default AlertCardRightBg;