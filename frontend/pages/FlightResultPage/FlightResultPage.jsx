import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from "react-native";
import image from '../../assets/images/background.jpg';
import styles from './FlightResultPage.styles';
import { COLORS } from '../../constants/theme';
import FlightResult from '../../components/FlightResult/FlightResult';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CreateAlertModal from '../../components/CreateAlertModal/CreateAlertModal';


export default function FlightResultPage({ route }) {
    /*Data from the other page*/
    const { startAirport, endAirport, duration, dateSpan } = route.params.data;
    const [createAlertModalIsVisible, setCreateAlertModalIsVisible] = useState(false);
    const fromDate = new Date(dateSpan.from);
    const untilDate = new Date(dateSpan.until);


    const navigation = useNavigation();

    const [trips, setTrips] = useState([
        {
            start: {
                airport: 'Nürnberg',
                date: '12.12.2000',
                time: '06:34',
            },
            destination: {
                airport: 'Berlin',
                date: '12.12.2000',
                time: '12:34',
            }
        },
        {
            start: {
                airport: 'Nürnberg',
                date: '12.12.2000',
                time: '06:35',
            },
            destination: {
                airport: 'Berlin',
                date: '12.12.2000',
                time: '12:34',
            }
        },
        {
            start: {
                airport: 'Nürnberg',
                date: '12.12.2000',
                time: '07:10',
            },
            destination: {
                airport: 'Berlin',
                date: '12.12.2000',
                time: '12:34',
            }
        }
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
                            <TouchableOpacity onPress={() => setCreateAlertModalIsVisible(true)}>
                                <Ionicons
                                    name={'notifications-outline'}
                                    size={40}
                                    color={COLORS.textWhite}
                                    style={styles.iconWithoutBackground}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={styles.main}
                    >
                        <ScrollView>
                            {trips.map(trip => {
                                return (
                                    <FlightResult
                                        key={trip.start.time}
                                        start={
                                            {
                                                airport: trip.start.airport,
                                                date: trip.start.date,
                                                time: trip.start.time,
                                            }
                                        }
                                        destination={
                                            {
                                                airport: trip.destination.airport,
                                                date: trip.destination.date,
                                                time: trip.destination.time,
                                            }
                                        }

                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
                    <CreateAlertModal 
                        isVisible={createAlertModalIsVisible}
                        onBackdropPress={() => setCreateAlertModalIsVisible(false)}
                        data={route.params.data}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}