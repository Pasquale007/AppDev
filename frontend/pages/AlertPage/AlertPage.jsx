import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "./AlertPage.style";
import { Ionicons } from '@expo/vector-icons';
import AlertCard from '../../components/AlertCard/AlertCard';
import { GestureHandlerRootView, ScrollView, Swipeable } from 'react-native-gesture-handler';

export default function AlertPage() {
    const [hasAlerts, setHasAlerts] = useState(true);

    let card = [];
    let prevOpenedCard;

    const testArr = [{
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "Nürnberg", arrival: "London" },
        maxPrice: 150
    },
    {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "Gelsenkirchen", arrival: "Amsterdam" },
        maxPrice: 150
    },
    {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "Rom", arrival: "Neapel" },
        maxPrice: 150
    },
    {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "Berlin", arrival: "Prag" },
        maxPrice: 150
    },
    {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "Leipzig", arrival: "Hamburg" },
        maxPrice: 150
    },
    {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "Frankfurt", arrival: "Mallorca" },
        maxPrice: 150
    },
    {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "München", arrival: "Paris" },
        maxPrice: 150
    },
    {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", arrival: "Paris" },
        maxPrice: 150
    },
    {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", arrival: "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR" },
        maxPrice: 150
    },
    {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", arrival: "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR" },
        maxPrice: 15000
    },
    {
        date: { start: "18.08.2023", end: "12.12.2023" },
        locations: { departure: "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", arrival: "RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR" },
        maxPrice: 1000000.5667
    }]

    const closeCard = (index) => {
        if (prevOpenedCard && prevOpenedCard !== card[index]) {
            prevOpenedCard.close();
        }
        prevOpenedCard = card[index];
    }

    return (
        <GestureHandlerRootView>
            <ScrollView
                contentContainerStyle={{ minHeight: '100%' }}
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView style={styles.alertContainer}>
                    <Text style={styles.alertHeadline}>
                        Meine Alerts
                    </Text>
                    {!hasAlerts ?
                        <View style={styles.noAlertsContainer}>
                            <Ionicons style={styles.alertIcon} size={100} name="notifications" testID="" />
                            <Text style={styles.noAlertsText}>
                                Keine Alerts vorhanden
                            </Text>
                        </View>
                        : <View style={styles.alertCardContainer}>
                            {testArr.map((alert, index) => (
                                <AlertCard 
                                    key={index}
                                    date={alert.date}
                                    locations={alert.locations}
                                    maxPrice={alert.maxPrice}
                                    index={index}
                                    closeCard={closeCard}
                                    cardArr={card}
                                />
                            ))}
                        </View>
                    }
                </SafeAreaView>
            </ScrollView>
        </GestureHandlerRootView>
    );
}