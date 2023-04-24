import React from 'react';
import { View, Text } from 'react-native';
import Modal from "react-native-modal";
import styles from "./CreateAlertModal.style";
import { Ionicons } from '@expo/vector-icons';
import AlertModalData from '../AlertModalData/AlertModalData';
import { TouchableOpacity } from 'react-native';

function CreateAlertModal({ isVisible, onBackdropPress, data }) {
    const { startAirport, endAirport, duration, dateSpan } = data;
    const fromDate = new Date(dateSpan.from);
    const untilDate = new Date(dateSpan.until);
    const fromDateFormatted = `${fromDate.getDate().toString().padStart(2, '0')}.${(fromDate.getMonth() + 1).toString().padStart(2, '0')}.${fromDate.getFullYear().toString()}`;
    const untilDateFormatted = `${untilDate.getDate().toString().padStart(2, '0')}.${(untilDate.getMonth() + 1).toString().padStart(2, '0')}.${untilDate.getFullYear().toString()}`;

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            hideModalContentWhileAnimating={true}>
            <View style={styles.container}>
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
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CreateAlertModal