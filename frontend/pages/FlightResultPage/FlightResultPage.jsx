import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from "react-native";
import image from '../../assets/images/background.jpg';
import styles from './FlightResultPage.styles';
import { COLORS } from '../../constants/theme';
import FlightResult from '../../components/FlightResult/FlightResult';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


export default function FlightResultPage() {
    const navigation = useNavigation();

    const [trips, setTrips] = useState([
        {
            origin: "NUE",
            destination: "BNX",
            outboundDate: "2023-05-02T00:00:00.000Z",
            outboundPrice: "19,95",
            inboundDate: "2023-05-13T00:00:00.000Z",
            inboundPrice: "16,99",
            totalPrice: "36,94"
        },
        {
            origin: "NUE",
            destination: "BNX",
            outboundDate: "2023-05-03T00:00:00.000Z",
            outboundPrice: "19,95",
            inboundDate: "2023-05-13T00:00:00.000Z",
            inboundPrice: "16,99",
            totalPrice: "361,94"
        },
    ]);

    useEffect(() => {

    }, []);

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
                            onPress={() => navigation.goBack()}
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
                        <ScrollView>
                            {trips.map(trip => {
                                console.log(trip)
                                return (
                                    <FlightResult
                                        key={trip.outboundDate + trip.origin}
                                        data={trip}

                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}