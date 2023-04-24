import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import styles from './FlightResult.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import flightData from '../../data/flightData.json';

function Info({ direction, iataCode, date }) {
    const [cityName, setCityName] = useState("");
    useEffect(() => {
        const airport = flightData.find(airport => airport.origin.iata === iataCode);
        setCityName(airport.origin.name)
    }, []);


    function getDate() {
        const searchedDay = new Date(date);
        const time = searchedDay.toLocaleTimeString().substring(0, 5);
        const yyyy = searchedDay.getFullYear();
        let mm = searchedDay.getMonth() + 1; // Months start at 0!
        let dd = searchedDay.getDate();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        const formattedSearchedDay = dd + '.' + mm + '.' + yyyy + " " + time;
        return formattedSearchedDay;

    }

    return (
        <View style={(direction === 'right' && styles.right)}>
            <View style={[(direction === 'right' ? { flexDirection: 'row-reverse', justifyContent: 'flex-end' } : { justifyContent: 'flex-start', flexDirection: 'row' }), { display: 'flex', alignItems: 'center' }]}>
                <Ionicons name={"airplane"} color={COLORS.textWhite} size={20} style={[{ marginRight: 10 }, styles.city, (direction === 'right' && styles.right)]} />
                <Text
                    style={[styles.text, (direction === 'right' && styles.right), { marginRight: 10 }]}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                >
                    {direction === "right"
                        ? "Rückflug"
                        : "Hinflug"
                    }
                </Text>
            </View>
            <Text
                style={[styles.city, (direction === 'right' && styles.right)]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
            >
                {cityName}
            </Text>
            <Text
                style={[styles.date, (direction === 'right' && styles.right)]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
            >
                {getDate()}
            </Text>
        </View>
    );
}

export default function FlightResult({ data }) {

    return (
        <View style={styles.main}>
            <Info direction={"left"} iataCode={data.origin} date={data.outboundDate} />
            <View style={{ backgroundColor: COLORS.background, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={[styles.textSmall, { marginLeft: 30 }]}>Zusammen ab</Text>
                <Text style={styles.costs}>{data.totalPrice} €</Text>
            </View>
            <Info direction={"right"} iataCode={data.destination} date={data.inboundDate} />
        </View>
    );

}