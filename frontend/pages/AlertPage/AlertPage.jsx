import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from "react-native";
import styles from "./AlertPage.style";
import { Ionicons } from '@expo/vector-icons';
import AlertCard from '../../components/AlertCard/AlertCard';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { getAlerts, deleteAlert, updateAlertActive, getAlert } from '../../firebaseQueries/firebaseQueries';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

export default function AlertPage() {
    const [deviceToken, setDeviceToken] = useState("");
    const [alerts, setAlerts] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const queryDeviceToken = async () => {
            const token = (await Notifications.getExpoPushTokenAsync({ projectId: "784e3e08-c80d-45aa-aebc-9a3c8f5440c0" })).data;
            setDeviceToken(token);
        }
        queryDeviceToken();
    }, []);

    useEffect(() => {
        let unsubscribe;
        console.log(deviceToken);

        if (deviceToken) {
            unsubscribe = getAlerts(deviceToken, setAlerts);
        }

        //Cleanup
        return () => {
            unsubscribe && unsubscribe();
        };
    }, [deviceToken]);

    const handleActiveChange = (isActive, id) => {
        updateAlertActive(isActive, id);
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
            <ScrollView
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
                                    id={alert.id}
                                    date={{ start: alert.startDate, end: alert.endDate }}
                                    locations={{ origin: alert.origin, destination: alert.destination }}
                                    duration={{ start: alert.minLength, end: alert.maxLength }}
                                    maxPrice={alert.maxPrice}
                                    onDelete={deleteCard}
                                    onSearch={searchAlert}
                                    isActive={alert.isActive}
                                    setIsActive={handleActiveChange}
                                    testID="alertCard"
                                />
                            ))}
                        </View>
                    }
                </SafeAreaView>
            </ScrollView>
        </GestureHandlerRootView>
    );
}