import React, { useState } from "react";
import { Text, View } from "react-native";
import styles from "./Select.styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function MySelect({ left, right, onClick }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePress = (number) => {
        if (number === activeIndex) {
            return;
        }
        onClick();
        setActiveIndex(activeIndex === 0 ? 1 : 0);
    };
    return (
        <View style={styles.flex}>
            <TouchableWithoutFeedback
                onPress={() => handlePress(0)}
            >
                <View
                    style={[activeIndex === 0 ? styles.activeBG : styles.passiveBG]}
                >
                    <Text
                        style={[
                            styles.text,
                            activeIndex === 0 ? styles.active : styles.passive,
                        ]}
                        numberOfLines={2}
                        adjustsFontSizeToFit={true}>
                        {left}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => handlePress(1)}
            >
                <View style={[activeIndex === 1 ? styles.activeBG : styles.passiveBG]}
                >
                    <Text
                        style={[
                            styles.text,
                            activeIndex === 1 ? styles.active : styles.passive,
                        ]}
                        numberOfLines={2}
                        adjustsFontSizeToFit={true}>
                        {right}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}