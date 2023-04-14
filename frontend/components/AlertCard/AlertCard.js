import React, { useState } from 'react';
import styles from "./AlertCard.style";
import { Text, View, TouchableOpacity, AppState } from 'react-native';
import { Switch } from 'react-native-switch';
import { Swipeable } from 'react-native-gesture-handler';
import { COLORS } from "../../constants/theme";
import { Ionicons } from '@expo/vector-icons';
import Animated, { Layout, LightSpeedOutLeft } from "react-native-reanimated";

function AlertCard({ date, locations, maxPrice, closeCard, onDelete, cardArr, isActive, setIsActive, id }) {
    /*isEnabled, because by using isActive as a value for the Switch, it won`t change the value so smooth
    in the UI*/
    const [isEnabled, setIsEnabled] = useState(isActive);

    const renderRightActions = () => {
        return (
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(id)}>
                <Ionicons style={styles.trashIcon} size={30} name="trash" />
            </TouchableOpacity>
        );
    };

    const handleToggleChange = () => {
        setIsEnabled(!isEnabled);
        setIsActive(!isActive, id);
    }

    return (
        <Animated.View style={styles.container} exiting={LightSpeedOutLeft} layout={Layout}>
            <Swipeable
                renderRightActions={renderRightActions}
                onSwipeableOpen={() => closeCard(id)}
                ref={(ref) => (cardArr[id] = ref)}
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
                                onValueChange={handleToggleChange}
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
        </Animated.View>
    )
}

export default AlertCard;