import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import styles from "./CreateAlertModal.style";
import { Entypo, Ionicons } from '@expo/vector-icons';
import AlertModalData from '../AlertModalData/AlertModalData';
import { TouchableOpacity } from 'react-native';
import AlertModalMaxPrice from '../AlertModalMaxPrice/AlertModalMaxPrice';
import { safeAlert } from '../../firebaseQueries/firebaseQueries';
import * as Notifications from 'expo-notifications';

function CreateAlertModal({ isVisible, onBackdropPress, data, onSuccess, onError }) {
    const [deviceToken, setDeviceToken] = useState("");
    const { origin, destination, lengthMin, lengthMax, outFromDate, outToDate } = data;
    console.log(data);
    const fromDate = new Date(outFromDate);
    const untilDate = new Date(outToDate);
    const fromDateFormatted = `${fromDate.getDate().toString().padStart(2, '0')}.${(fromDate.getMonth() + 1).toString().padStart(2, '0')}.${fromDate.getFullYear().toString()}`;
    const untilDateFormatted = `${untilDate.getDate().toString().padStart(2, '0')}.${(untilDate.getMonth() + 1).toString().padStart(2, '0')}.${untilDate.getFullYear().toString()}`;
    const [durationString, setDurationString] = useState("");
    const [maxPrice, setMaxPrice] = useState(0);

    useEffect(() => {
        const queryDeviceToken = async () => {
            const token = (await Notifications.getExpoPushTokenAsync({projectId: "784e3e08-c80d-45aa-aebc-9a3c8f5440c0"})).data;
            setDeviceToken(token);
        }
        queryDeviceToken();
        buildDurationString();
    }, []);

    const buildDurationString = () => {
        if (lengthMin && lengthMax) {
            const dayOrDays = +lengthMax === 1 ? "Tag" : "Tage";

            if (parseInt(lengthMin) - parseInt(lengthMax) === 0) {
                setDurationString(`${lengthMin} ${dayOrDays}`);
                return;
            }
            setDurationString(`${lengthMin} - ${lengthMax} ${dayOrDays}`);
        }
    }

    const saveAlertHandler = () => {
        const maxPossiblePrice = 10000;

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

        if (deviceToken) {
            console.log(deviceToken);
            const alert = {
                startDate: fromDateFormatted,
                endDate: untilDateFormatted,
                minLength: parseInt(lengthMin) || null,
                maxLength: parseInt(lengthMax) || null,
                origin: origin.name,
                originIATA: origin.iata,
                destination: destination.name,
                destinationIATA: destination.iata,
                //maxPrice is already parsed as Float
                maxPrice: maxPrice,
                deviceId: deviceToken,
                isActive: true
            };
            console.log(alert)
            onBackdropPress();
            //Safes Alert in Firebase Firestore
            safeAlert(alert).then(() => {
                onSuccess("Alert erfolgreich gespeichert!");
            }).catch((error) => {
                console.log(error)
                onError("Fehler beim Speichern des Alerts!");
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
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={styles.headContainer}>
                        <Text style={styles.headline} testID="headline">Alert hinzufügen</Text>
                        <TouchableOpacity onPress={onBackdropPress} testID="closeBtn">
                            <Ionicons style={styles.closeIcon} size={30} name="close-circle-outline" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.dataContainer}>
                            <AlertModalData headline="Reisezeitraum" data={`${fromDateFormatted} - ${untilDateFormatted}`}
                                icon={<Ionicons style={styles.icon} size={16} name="calendar-outline" />}
                            />
                            {lengthMin && lengthMax &&
                                <AlertModalData headline="Reisedauer" data={durationString}
                                    icon={<Ionicons style={styles.icon} size={16} name="timer-outline" />}
                                />
                            }
                            <AlertModalData headline="Von" data={origin.name}
                                icon={<Entypo style={styles.icon} name={"aircraft-take-off"} size={16} />}
                            />
                            <AlertModalData headline="Nach" data={destination?.name || "Europa"}
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
                            <TouchableOpacity style={styles.button} onPress={saveAlertHandler} testID="saveBtn">
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