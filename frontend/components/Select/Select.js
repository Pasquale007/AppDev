import React, { useState } from "react";
import { Text } from "react-native";
import styles from "./Select.styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MySelect({ left, right }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePress = () => {
        setActiveIndex(activeIndex === 0 ? 1 : 0);
    };
    return (
        <TouchableOpacity style={styles.flex} onPress={handlePress}>
            <Text
                style={[
                    styles.text,
                    activeIndex === 0 ? styles.active : styles.passive,
                ]}
            >
                {left}
            </Text>
            <Text
                style={[
                    styles.text,
                    activeIndex === 1 ? styles.active : styles.passive,
                ]}
            >
                {right}
            </Text>
        </TouchableOpacity>
    );
}