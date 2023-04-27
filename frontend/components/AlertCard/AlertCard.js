import React from 'react';
import styles from "./AlertCard.style";
import { Text, View, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-switch';
import { Swipeable } from 'react-native-gesture-handler';
import { COLORS } from "../../constants/theme";
import { Ionicons } from '@expo/vector-icons';
import Animated, { Layout, LightSpeedOutLeft } from "react-native-reanimated";

function AlertCard({ date, locations, maxPrice, closeCard, onDelete, cardArr, isActive, setIsActive, id }) {

    const renderRightActions = () => {
        return (
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(id)} testID="deleteButton">
                <Ionicons style={styles.trashIcon} size={30} name="trash" />
            </TouchableOpacity>
        );
    };

    const handleToggleChange = () => {
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
                            {locations.origin}
                        </Text>
                        <Text style={styles.arrivalText} numberOfLines={1} ellipsizeMode='tail'
                            testID="arrivalText"
                        >
                            {locations.destination}
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
                                value={isActive}
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