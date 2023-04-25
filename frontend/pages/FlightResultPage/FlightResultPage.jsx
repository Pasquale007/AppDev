import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from "react-native";
import image from '../../assets/images/background.jpg';
import styles from './FlightResultPage.styles';
import { COLORS, SIZES, FONT } from '../../constants/theme';
import FlightResult from '../../components/FlightResult/FlightResult';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CreateAlertModal from '../../components/CreateAlertModal/CreateAlertModal';
import ToastContainer from '../../components/ToastContainer/ToastContainer';
import Toast from 'react-native-toast-message';


export default function FlightResultPage({ route }) {
    const [createAlertModalIsVisible, setCreateAlertModalIsVisible] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigation = useNavigation();

    useEffect(() => {
        if(successMsg){
            Toast.show({
                type: "success",
                text1: successMsg,
            })
            setSuccessMsg("");
        }

        if(errorMsg){
            Toast.show({
                type: "error",
                text1: errorMsg,
            })
            setErrorMsg("");
        }
    }, [successMsg, errorMsg]);

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
                        onSuccess={(msg) => setSuccessMsg(msg)}
                        onError={(msg) => setErrorMsg(msg)}
                    />
                </View>
            </ImageBackground>
            <ToastContainer />
        </View>
    );
}