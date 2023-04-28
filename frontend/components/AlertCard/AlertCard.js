import React, { useEffect, useState } from 'react';
import styles from "./AlertCard.style";
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Switch } from 'react-native-switch';
import { Swipeable } from 'react-native-gesture-handler';
import { COLORS } from "../../constants/theme";
import { Ionicons } from '@expo/vector-icons';
import Animated, { Layout, LightSpeedOutLeft } from "react-native-reanimated";
import AlertsArrow from '../AlertsArrow/AlertsArrow';

function AlertCard({ date, locations, duration, maxPrice, closeCard, onDelete, cardArr, isActive, setIsActive, id }) {
    const [durationString, setDurationString] = useState("");

    useEffect(() => {
        buildDurationString();
    }, []);

    const buildDurationString = () => {
        if (duration?.start && duration?.end) {
            const dayOrDays = +duration.end === 1 ? "Tag" : "Tage";

            if (parseInt(duration.start) - parseInt(duration.end) === 0) {
                setDurationString(`${duration.start} ${dayOrDays}`);
                return;
            }
            setDurationString(`${duration.start} - ${duration.end} ${dayOrDays}`);
        }
    }

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
                        {durationString != "" &&
                            <Text style={[styles.dateText, styles.minLineHeight]} testID="duration">
                                {durationString}
                            </Text>
                        }
                        <View style={styles.locationsContainer}>
                            <View style={styles.arrowContainer}>
                                <AlertsArrow />
                            </View>
                            <View style={styles.locations}>
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
                        </View>
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