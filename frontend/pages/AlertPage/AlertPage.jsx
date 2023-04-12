import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from "react-native";
import styles from "./AlertPage.style";
import { Ionicons } from '@expo/vector-icons';
import AlertCard from '../../components/AlertCard/AlertCard';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../firebase/config';
import DeviceInfo from "react-native-device-info";

export default function AlertPage() {
    const [alerts, setAlerts] = useState([]);

    let card = [];
    let prevOpenedCard;

    const deviceId = DeviceInfo.getUniqueId();
    const alertRef = firebase.firestore().collection("alerts");

    useEffect(() => {
        alertRef.onSnapshot(querySnapshot => {
            const newAlerts = [];
            querySnapshot.forEach((doc) => {
                const alert = doc.data();
                alert.id = doc.id;
                newAlerts.push(alert);
            });
            setAlerts(newAlerts);
        },
            error => {
                console.log(error);
            }
        )
    }, []);

    const handleActiveChange = (isActive, id) => {
        alertRef.doc(id).update({isActive});
    }

    const closeCard = (id) => {
        if (prevOpenedCard && prevOpenedCard !== card[id]) {
            prevOpenedCard.close();
        }
        prevOpenedCard = card[id];
    }

    return (
        <GestureHandlerRootView>
            <ScrollView
                contentContainerStyle={{ minHeight: '100%' }}
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView style={styles.alertContainer}>
                    <Text style={styles.alertHeadline}>
                        Meine Alerts {deviceId}
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
                                    date={{start: alert.startDate, end: alert.endDate}}
                                    locations={{departure: alert.departure, arrival: alert.arrival}}
                                    maxPrice={alert.maxPrice}
                                    closeCard={closeCard}
                                    cardArr={card}
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