import React, { useState } from "react";
import { Text, View } from "react-native";
import styles from "./Select.styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function MySelect({ left, right, onClick }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePress = (number) => {
        onClick();
        if (number === activeIndex) {
            return;
        }
        setActiveIndex(activeIndex === 0 ? 1 : 0);
    };
    return (
        <View style={styles.flex}>
            <TouchableWithoutFeedback
                onPress={() => handlePress(0)}
            >
                <Text
                    style={[
                        styles.text,
                        activeIndex === 0 ? styles.active : styles.passive,
                    ]}>
                    {left}
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => handlePress(1)}
            >
                <Text
                    style={[
                        styles.text,
                        activeIndex === 1 ? styles.active : styles.passive,
                    ]}>
                    {right}
                </Text>
            </TouchableWithoutFeedback>
        </View>
    );
}