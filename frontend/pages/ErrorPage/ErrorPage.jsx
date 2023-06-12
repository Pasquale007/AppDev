import { View, Text, ImageBackground } from "react-native";
import React from 'react';
import styles from "./ErrorPage.style.js";
import image from '../../assets/images/background.jpg';

export function ErrorPage() {


    return (
        <View style={styles.container}>
        <ImageBackground
                    source={image}
                    resizeMode="cover"
                >
        {/* <View style={styles.main}> */}

            <Text style={styles.errorText}>Kein Notification-Token erkannt</Text>
            {/* </View> */}
        </ImageBackground>
        </View>
    )
}