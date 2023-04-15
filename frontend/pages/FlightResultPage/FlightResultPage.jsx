import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, View } from "react-native";
import image from '../../assets/images/background.jpg';
import styles from './FlightResultPage.styles';
import { COLORS } from '../../constants/theme';
import FlightResult from '../../components/FlightResult/FlightResult';
import { ScrollView } from 'react-native-gesture-handler';


export default function FlightResultPage() {

    const [trips, setTrips] = React.useState([
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
                        <ScrollView>
                            {trips.map(trip => {
                                console.log(trip)
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



                </View>
            </ImageBackground>
        </View>
    );
}