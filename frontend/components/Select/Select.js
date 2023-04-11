import React, { useState } from "react";
import { Text, View } from "react-native";
import styles from "./Select.styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function MySelect({ left, right }) {
    const [activeIndex, setActiveIndex] = useState(0);

    function Element({ text, onPress, index }) {

        return (
            <TouchableWithoutFeedback
                style={styles.clickElement}
                onPress={onPress}
            >
                <Text
                    style={[
                        styles.text,
                        activeIndex === index ? styles.active : styles.passive,
                    ]}>
                    {text}
                </Text>
            </TouchableWithoutFeedback>
        );
    }


    const handlePress = (number) => {
        if (number === activeIndex) {
            return;
        }
        setActiveIndex(activeIndex === 0 ? 1 : 0);
    };

    return (
        <View style={styles.flex}>
            <Element text={left} onPress={() => handlePress(0)} index={0} />
            <Element text={right} onPress={() => handlePress(1)} index={1} />
        </View>
    );
}