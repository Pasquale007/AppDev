import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from "react-native";
import styles from "./AlertPage.style";
import { Ionicons } from '@expo/vector-icons';
import AlertCard from '../../components/AlertCard/AlertCard';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { getAlerts, deleteAlert, updateAlertActive, getAlert } from '../../firebaseQueries/firebaseQueries';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../LoadingPage/Loading';
import { ErrorPage } from '../ErrorPage/ErrorPage';

export default function AlertPage() {
    const [allowPushNotifications, setAllowPushNotifications] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [deviceToken, setDeviceToken] = useState("");
    const [alerts, setAlerts] = useState([]);
    const navigation = useNavigation();


    async function registerForPushNotificationsAsync() {
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            if (existingStatus !== 'granted') {
                setAllowPushNotifications(false)
            }
        }else{
        console.log("Emulator -> no push Notification granted, but ok for testing purpose.")   
        }
    }

    let card = [];
    let prevOpenedCard;

    useEffect(() => {
        const queryDeviceToken = async () => {
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            setDeviceToken(token);
        }
        queryDeviceToken();
        registerForPushNotificationsAsync();
    }, []);

    useEffect(() => {
        if (alerts.length > 0) {
            setIsLoaded(true);
        }
    }, [alerts]);

    useEffect(() => {
        let unsubscribe;

        if (deviceToken) {
            unsubscribe = getAlerts(deviceToken, handleFetchedAlerts);
        }

        //Cleanup
        return () => {
            unsubscribe && unsubscribe();
        };
    }, [deviceToken]);

    const handleFetchedAlerts = (alerts) => {
        setAlerts(alerts);
        setIsLoaded(true);
    }

    const handleActiveChange = (isActive, id) => {
        updateAlertActive(isActive, id);
    }

    const closeCard = (id) => {
        if (prevOpenedCard && prevOpenedCard !== card[id]) {
            prevOpenedCard.close();
        }
        prevOpenedCard = card[id];
    }

    const deleteCard = (id) => {
        deleteAlert(id);
    }

    const searchAlert = async (id) => {
        try {
            const alert = await getAlert(id);
            const alertData = alert.data();


            navigation.navigate("Home", {
                screen: 'FlightResultPage',
                params: {
                    data: {
                        'origin': { name: alertData.origin, iata: alertData.originIATA },
                        'destination': { name: alertData.destination, iata: alertData.destinationIATA },
                        'ignoredDestinations': '',
                        'outFromDate': alertData.startDate.split(".").reverse().join("-"),
                        'outToDate': alertData.endDate.split(".").reverse().join("-"),
                        'lengthMin': alertData.minLength,
                        'lengthMax': alertData.maxLength,
                        'maxprice': alertData.maxPrice
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <GestureHandlerRootView>
            {!allowPushNotifications
                ? <ErrorPage />
                : !isLoaded
                    ? <LoadingScreen />
                    : <ScrollView
                        contentContainerStyle={{ minHeight: '100%' }}
                        showsVerticalScrollIndicator={false}
                    >
                        <SafeAreaView style={styles.alertContainer}>
                            <Text style={styles.alertHeadline}>
                                Meine Alerts
                            </Text>
                            {alerts.length === 0 ?
                                <View style={styles.noAlertsContainer}>
                                    <Ionicons style={styles.alertIcon} size={100} name="notifications" testID="" />
                                    <Text style={styles.noAlertsText} testID="noAlertsText">
                                        Keine Alerts vorhanden
                                    </Text>
                                </View>
                                : <View style={styles.alertCardContainer}>
                                    {alerts.map((alert) => (
                                        <AlertCard
                                            key={alert.id}
                                            alert={alert}
                                            closeCard={closeCard}
                                            onDelete={deleteCard}
                                            onSearch={searchAlert}
                                            cardArr={card}
                                            setIsActive={handleActiveChange}
                                            testID="alertCard"
                                        />
                                    ))}
                                </View>
                            }
                        </SafeAreaView>
                    </ScrollView>
            }
        </GestureHandlerRootView>
    );
}