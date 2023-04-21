import React from 'react';
import { Image, Text, View } from "react-native";
import styles from './FlightResult.styles';
import FlightIcon from '../../assets/images/FlightIcon.png';

function Info({ direction, airport, date, time }) {

    return (
        <View style={{ width: "30%" }}>
            <Text
                style={[styles.city, (direction === 'right' && styles.right)]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
            >
                {airport}
            </Text>
            <Text
                style={[styles.date, (direction === 'right' && styles.right)]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
            >
                {date}
            </Text>
            <Text
                style={[styles.date, (direction === 'right' && styles.right)]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
            >
                {time}
            </Text>
        </View>
    );
}

export default function FlightResult({ start, destination }) {

    return (
        <View style={styles.main}>
            <View style={styles.flex}>
                <Info direction={"left"} airport={start.airport} date={start.date} time={start.time} />
                <Image
                    resizeMode='contain'
                    source={FlightIcon}
                    style={{ width: "40%" }}
                >
                </Image>
                <Info direction={"right"} airport={destination.airport} date={destination.date} time={destination.time} />
            </View>
            <Text style={styles.costs}>ab 12,90</Text>
        </View>
    );

}