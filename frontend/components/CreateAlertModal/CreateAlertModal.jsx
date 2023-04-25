import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import styles from "./CreateAlertModal.style";
import { Entypo, Ionicons } from '@expo/vector-icons';
import AlertModalData from '../AlertModalData/AlertModalData';
import { TouchableOpacity } from 'react-native';
import AlertModalMaxPrice from '../AlertModalMaxPrice/AlertModalMaxPrice';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from "uuid";
import { safeAlert } from '../../firebaseQueries/firebaseQueries';

function CreateAlertModal({ isVisible, onBackdropPress, data, onSuccess, onError }) {
    const [uuid, setUuid] = useState("");
    const { startAirport, endAirport, duration, dateSpan } = data;
    const fromDate = new Date(dateSpan.from);
    const untilDate = new Date(dateSpan.until);
    const fromDateFormatted = `${fromDate.getDate().toString().padStart(2, '0')}.${(fromDate.getMonth() + 1).toString().padStart(2, '0')}.${fromDate.getFullYear().toString()}`;
    const untilDateFormatted = `${untilDate.getDate().toString().padStart(2, '0')}.${(untilDate.getMonth() + 1).toString().padStart(2, '0')}.${untilDate.getFullYear().toString()}`;
    const [maxPrice, setMaxPrice] = useState(0);

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

    const saveAlertHandler = () => {
        const maxPossiblePrice = 1000000;

        if (!maxPrice) {
            onError("Der Preis darf nicht leer sein!");
            onBackdropPress();
            return;
        }

        if (maxPrice > maxPossiblePrice) {
            onError("Der Preis ist zu hoch!");
            onBackdropPress();
            setMaxPrice(0);
            return;
        }

        if (uuid) {
            const alert = {
                startDate: fromDateFormatted,
                endDate: untilDateFormatted,
                startDuration: duration.start,
                endDuration: duration.end,
                departure: startAirport.name,
                arrival: endAirport.name,
                maxPrice: maxPrice,
                deviceId: uuid,
                isActive: true
            };
            onBackdropPress();
            //Safes Alert in Firebase Firestore
            safeAlert(alert).then(() => {
                onSuccess("Alert erfolgreich gespeichert!");
            }).catch((error) => {
                onerror("Fehler beim Speichern des Alerts!");
            })
            setMaxPrice(0);
        }
    }

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionOutTiming={0}
        >
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.headContainer}>
                        <Text style={styles.headline}>Alert hinzufügen</Text>
                        <TouchableOpacity onPress={onBackdropPress}>
                            <Ionicons style={styles.closeIcon} size={30} name="close-circle-outline" testID="" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.dataContainer}>
                            <AlertModalData headline="Reisezeitraum" data={`${fromDateFormatted} - ${untilDateFormatted}`}
                                icon={<Ionicons style={styles.icon} size={16} name="calendar-outline" testID="" />}
                            />
                            <AlertModalData headline="Reisedauer" data={`${duration.start} - ${duration.end} Tage`}
                                icon={<Ionicons style={styles.icon} size={16} name="timer-outline" testID="" />}
                            />
                            <AlertModalData headline="Von" data={startAirport.name}
                                icon={<Entypo style={styles.icon} name={"aircraft-take-off"} size={16} />}
                            />
                            <AlertModalData headline="Nach" data={endAirport.name}
                                icon={<Entypo style={styles.icon} name={"aircraft-landing"} size={16} />}
                            />
                            <AlertModalData headline="Rückflug inbegriffen"
                                icon={<Entypo style={styles.icon} name={"info-with-circle"} size={16} />}
                            />
                            <AlertModalMaxPrice headline="Max. Preis" placeholder="150,00"
                                maxPrice={maxPrice} setMaxPrice={(max) => setMaxPrice(max)}
                                icon={<Ionicons style={styles.icon} size={16} name="cash-outline" testID="" />}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={saveAlertHandler}>
                                <Text style={styles.buttonText}>Speichern</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

export default CreateAlertModal