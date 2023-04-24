import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import styles from "./CreateAlertModal.style";
import { Ionicons } from '@expo/vector-icons';
import AlertModalData from '../AlertModalData/AlertModalData';
import { TouchableOpacity } from 'react-native';
import AlertModalMaxPrice from '../AlertModalMaxPrice/AlertModalMaxPrice';

function CreateAlertModal({ isVisible, onBackdropPress, data }) {
    const { startAirport, endAirport, duration, dateSpan } = data;
    const fromDate = new Date(dateSpan.from);
    const untilDate = new Date(dateSpan.until);
    const fromDateFormatted = `${fromDate.getDate().toString().padStart(2, '0')}.${(fromDate.getMonth() + 1).toString().padStart(2, '0')}.${fromDate.getFullYear().toString()}`;
    const untilDateFormatted = `${untilDate.getDate().toString().padStart(2, '0')}.${(untilDate.getMonth() + 1).toString().padStart(2, '0')}.${untilDate.getFullYear().toString()}`;
    const [maxPrice, setMaxPrice] = useState(0);
    console.log(startAirport);

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            hideModalContentWhileAnimating={true}>
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
                            <AlertModalData headline="Reisezeitraum" data={`${fromDateFormatted} - ${untilDateFormatted}`} />
                            <AlertModalData headline="Reisedauer" data={`${duration.start} - ${duration.end} Tage`} />
                            <AlertModalData headline="Von" data={startAirport.name} />
                            <AlertModalData headline="Nach" data={endAirport.name} />
                            <AlertModalData data="Rückflug inbegriffen" />
                            <AlertModalMaxPrice headline="Max. Preis" placeholder="150,00"
                                maxPrice={maxPrice} setMaxPrice={(max) => setMaxPrice(max)} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}>
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