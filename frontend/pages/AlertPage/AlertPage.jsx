import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from "react-native";
import styles from "./AlertPage.style";
import { Ionicons } from '@expo/vector-icons';
import AlertCard from '../../components/AlertCard/AlertCard';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { getAlerts, deleteAlert, updateAlertActive } from '../../firebaseQueries/firebaseQueries';
import { getUUID } from '../../auth/uuid';

export default function AlertPage() {
    const [uuid, setUuid] = useState("");
    const [alerts, setAlerts] = useState([]);

    let card = [];
    let prevOpenedCard;

    useEffect(() => {    
        const queryUUID = async () => {
            setUuid(await getUUID());
        }
        queryUUID();
    }, []);

    useEffect(() => {
        let unsubscribe;
        console.log(uuid);

        if (uuid) {
            unsubscribe = getAlerts(uuid, setAlerts);
        }

        //Cleanup
        return () => {
            unsubscribe && unsubscribe();
        };
    }, [uuid]);

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
                                    duration={{start: alert.minLength, end: alert.maxLength}}
                                    maxPrice={alert.maxPrice}
                                    closeCard={closeCard}
                                    onDelete={deleteCard}
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