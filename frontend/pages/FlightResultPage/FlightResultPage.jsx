import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, View } from "react-native";
import image from '../../assets/images/background.jpg';
import styles from './FlightResultPage.styles';
import { COLORS } from '../../constants/theme';


export default function FlightResultPage() {


    return (
        <View>
            <ImageBackground
                source={image}
                resizeMode="cover">
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Ionicons
                            name={'arrow-back-outline'}
                            size={40}
                            color={COLORS.textWhite}
                            style={styles.icon}
                        />
                        <View style={styles.topBar}>
                            <Ionicons
                                name={'notifications-outline'}
                                size={40}
                                color={COLORS.textWhite}
                                style={styles.iconWithoutBackground}
                            />
                        </View>

                    </View>
                    <View
                        style={styles.main}
                    >
                    </View>



                </View>
            </ImageBackground>
        </View>
    );
}