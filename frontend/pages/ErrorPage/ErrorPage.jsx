import { Text, ImageBackground, View } from "react-native";
import React from 'react';
import styles from "./ErrorPage.style.js";
import image from '../../assets/images/background.jpg';

export function ErrorPage() {


    return (
        <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.container}
            blurRadius={5}


        >
            <View style={styles.overlay} />
            <Text style={styles.errorText}>Du musst dieser App die Berechtigung geben, Benachrichtigungen zu senden. Gehe dazu in die Einstellungen um dies zu ändern ;)</Text>
            <View />
        </ImageBackground>
    )
}