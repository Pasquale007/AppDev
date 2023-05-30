import React, { useEffect, useState } from 'react';
import styles from "./AlertCard.style";
import { Text, View } from 'react-native';
import { Switch } from 'react-native-switch';
import { Swipeable } from 'react-native-gesture-handler';
import { COLORS } from "../../constants/theme";
import Animated, { Layout, LightSpeedOutLeft } from "react-native-reanimated";
import AlertsArrow from '../AlertsArrow/AlertsArrow';
import AlertCardLeftBg from '../AlertCardLeftBg/AlertCardLeftBg';
import AlertCardRightBg from '../AlertCardRightBg/AlertCardRightBg';

function AlertCard({ date, locations, duration, maxPrice, closeCard, onDelete, onSearch, cardArr, isActive, setIsActive, id }) {
    const [durationString, setDurationString] = useState("");

    useEffect(() => {
        buildDurationString();
    }, []);

    const buildDurationString = () => {
        if (duration?.start > -1 && duration?.end > -1) {
            const dayOrDays = +duration.end === 1 ? "Tag" : "Tage";

            if (parseInt(duration.start) - parseInt(duration.end) === 0) {
                setDurationString(`${duration.start} ${dayOrDays}`);
                return;
            }
            setDurationString(`${duration.start} - ${duration.end} ${dayOrDays}`);
        }
    }

    const renderRightActions = (progress, dragX) => (
        <AlertCardRightBg progress={progress} dragX={dragX} id={id} onDelete={onDelete}/>
    );

    const renderLeftActions = (progress, dragX) => (
        <AlertCardLeftBg progress={progress} dragX={dragX} id={id} onSearch={onSearch}/>
    )

    const handleToggleChange = () => {
        setIsActive(!isActive, id);
    }

    return (
        <Animated.View style={styles.container} exiting={LightSpeedOutLeft} layout={Layout}>
            <Swipeable
                renderRightActions={renderRightActions}
                renderLeftActions={renderLeftActions}
                friction={1.5} // Set the friction value for resistance during swipe
                overshootLeft={false} // Disable overshooting to the left
                overshootRight={false} // Disable overshooting to the right
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
            <View style={styles.alertBg}/>
        </Animated.View>
    )
}

export default AlertCard;