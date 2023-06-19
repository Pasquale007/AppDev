import React, { useEffect, useRef, useState } from 'react';
import styles from "./AlertCard.style";
import { Text, View, AppState } from 'react-native';
import { Switch } from 'react-native-switch';
import { Swipeable } from 'react-native-gesture-handler';
import { COLORS } from "../../constants/theme";
import Animated, { Layout, LightSpeedOutLeft } from "react-native-reanimated";
import AlertsArrow from '../AlertsArrow/AlertsArrow';
import AlertCardLeftBg from '../AlertCardLeftBg/AlertCardLeftBg';
import AlertCardRightBg from '../AlertCardRightBg/AlertCardRightBg';
import { useIsFocused } from '@react-navigation/native';

function AlertCard({ alert, closeCard, onDelete, onSearch, cardArr, setIsActive}) {

    const [durationString, setDurationString] = useState("");
    const [alertIsActive, setAlertIsActive] = useState(alert.isActive);
    const isFocused = useIsFocused();

    useEffect(() => {
        buildDurationString();
    }, []);

    //Saves isActive to Firebase when App is in Background or this screen is not focused anymore leading to a better performance
    useEffect(() => {
        if (!isFocused) {
            setIsActive(alertIsActive, alert.id);
            closeCard(alert.id);
        }

        const subscription = AppState.addEventListener("change", appState => {
            if (appState === "background" || appState === "inactive") {
                setIsActive(alertIsActive, alert.id);
            }
        })

        return () => {
            subscription.remove();
        };
    }, [alertIsActive, isFocused])

    const buildDurationString = () => {
        if (alert.minLength > -1 && alert.maxLength > -1) {
            const dayOrDays = +alert.maxLength === 1 ? "Tag" : "Tage";

            if (parseInt(alert.minLength) - parseInt(alert.maxLength) === 0) {
                setDurationString(`${alert.minLength} ${dayOrDays}`);
                return;
            }
            setDurationString(`${alert.minLength} - ${alert.maxLength} ${dayOrDays}`);
        }
    }

    const renderRightActions = (progress, dragX) => (
        <AlertCardRightBg progress={progress} dragX={dragX} id={alert.id} onDelete={onDelete} />
    );

    const renderLeftActions = (progress, dragX) => (
        <AlertCardLeftBg progress={progress} dragX={dragX} id={alert.id} onSearch={onSearch} />
    )

    const handleToggleChange = () => {
        setAlertIsActive(!alertIsActive);
    }

    return (
        <Animated.View style={styles.container} exiting={LightSpeedOutLeft} layout={Layout}>
            <Swipeable
                renderRightActions={renderRightActions}
                renderLeftActions={renderLeftActions}
                friction={1.5} // Set the friction value for resistance during swipe
                overshootLeft={false} // Disable overshooting to the left
                overshootRight={false} // Disable overshooting to the right
                onSwipeableOpen={() => closeCard(alert.id)}
                ref={(ref) => (cardArr[alert.id] = ref)}
                testID="alertCard"
            >
                <View style={styles.alertCard}>
                    <View style={styles.leftSide}>
                        <Text style={styles.dateText} testID="date">
                            {alert.startDate} - {alert.endDate}
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
                                    {alert.origin}
                                </Text>
                                <Text style={styles.arrivalText} numberOfLines={1} ellipsizeMode='tail'
                                    testID="arrivalText"
                                >
                                    {alert.destination}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rightSide}>
                        <Text style={styles.maxPriceText} numberOfLines={1} adjustsFontSizeToFit={true}
                            testID="priceText"
                        >
                            {alert.maxPrice.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
                        </Text>
                        <View style={styles.toggleButtonContainer}>
                            <Switch
                                value={alertIsActive}
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
            <View style={styles.alertBg} />
        </Animated.View>
    )
}

export default AlertCard;