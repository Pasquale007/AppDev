import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from "react-native";
import styles from "./AlertPage.style";
import { Ionicons } from '@expo/vector-icons';
import AlertCard from '../../components/AlertCard/AlertCard';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../firebase/config';
import Toast, { ErrorToast } from "react-native-toast-message";
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from "uuid";
import { getAlerts } from '../../firebaseQueries';


import { COLORS, FONT, SIZES } from "../../constants/theme";

export default function AlertPage() {
    //const [alerts, setAlerts] = useState([]);
    const [uuid, setUuid] = useState("");
    const alerts = getAlerts(uuid);

    let card = [];
    let prevOpenedCard;

    const alertRef = firebase.firestore().collection("alerts");

    const toastConfig = {
        error: (props) => (
            <ErrorToast
                {...props}
                style={{ backgroundColor: "#08060E", borderLeftColor: COLORS.switchInactive }}
                text1Style={{
                    fontSize: SIZES.medium,
                    fontFamily: FONT.semiBold,
                    color: COLORS.textWhite,
                }}
            />
        )
    };

    useEffect(() => {
        const getUUID = async () => {
            let storedUuid = await SecureStore.getItemAsync("uuid");
            if (!storedUuid) {
                storedUuid = uuidv4();
                await SecureStore.setItemAsync("uuid", storedUuid);
            }
            setUuid(storedUuid);
        }
        getUUID();
    }, []);

    const handleActiveChange = (isActive, id) => {
        alertRef.doc(id).update({ isActive });
    }

    const closeCard = (id) => {
        if (prevOpenedCard && prevOpenedCard !== card[id]) {
            prevOpenedCard.close();
        }
        prevOpenedCard = card[id];
    }

    const deleteCard = (id) => {
        const db = firebase.firestore();
        const batch = db.batch();
        batch.delete(alertRef.doc(id));
        batch.commit().then(() => {
            console.log("Alert erfolgreich gelöscht!");
        }).catch((error) => {
            Toast.show({
                type: "error",
                text1: `Fehler beim Löschen des Alerts: ${error}`,
                visibilityTime: 1500,
                autoHide: true,
            });
        });
    }

    /*const deleteCard = async (id) => {
        const sourceAlertRef = alertRef.doc(id);
        const sourceAlert = await sourceAlertRef.get();
        await alertRef.add(sourceAlert.data());
    }*/

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
                                    locations={{ departure: alert.departure, arrival: alert.arrival }}
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
            <Toast config={toastConfig} />
        </GestureHandlerRootView>
    );
}