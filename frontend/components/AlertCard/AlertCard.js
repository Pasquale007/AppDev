import React, { useState } from 'react';
import styles from "./AlertCard.style";
import { Text, View, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-switch';
import { Swipeable } from 'react-native-gesture-handler';
import { COLORS } from "../../constants/theme";
import { Ionicons } from '@expo/vector-icons';

function AlertCard({ date, locations, maxPrice, index, closeCard, cardArr }) {
    const [isEnabled, setIsEnabled] = useState(true);

    const renderRightActions = () => {
        return (
            <TouchableOpacity style={styles.deleteButton}>
                <Ionicons style={styles.trashIcon} size={30} name="trash" />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Swipeable
                renderRightActions={renderRightActions}
                onSwipeableOpen={() => closeCard(index)}
                ref={(ref) => (cardArr[index] = ref)}
                testID="alertCard"
            >
                <View style={styles.alertCard}>
                    <View style={styles.leftSide}>
                        <Text style={styles.dateText} testID="date">
                            {date.start} - {date.end}
                        </Text>
                        <Text style={styles.departureText} numberOfLines={1} ellipsizeMode='tail'
                            testID="departureText"
                        >
                            {locations.departure}
                        </Text>
                        <Text style={styles.arrivalText} numberOfLines={1} ellipsizeMode='tail'
                            testID="arrivalText"
                        >
                            {locations.arrival}
                        </Text>
                    </View>
                    <View style={styles.rightSide}>
                        <Text style={styles.maxPriceText} numberOfLines={1} adjustsFontSizeToFit={true}
                            testID="priceText"
                        >
                            {maxPrice.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
                        </Text>
                        <View style={styles.toggleButtonContainer}>
                            <Switch
                                value={isEnabled}
                                onValueChange={() => setIsEnabled(!isEnabled)}
                                circleSize={20}
                                circleBorderWidth={0}
                                backgroundActive={COLORS.switchActive}
                                backgroundInactive={COLORS.switchInactive}
                                changeValueImmediately={true}
                                renderActiveText={false}
                                renderInActiveText={false}
                                testID="switchButton"
                            />
                        </View>
                    </View>
                </View>
            </Swipeable>
            <View style={styles.cardBackground} />
        </View>
    )
}

export default AlertCard;