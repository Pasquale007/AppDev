import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import styles from './FlightResult.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import flightData from '../../data/flightData.json';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        <View style={[(direction === 'right' && styles.right), { padding: '5%' }]}>
            <View style={[direction === "left" ? ({ justifyContent: 'flex-start', flexDirection: 'row' }) : ({ justifyContent: 'flex-end', flexDirection: 'row' }), { display: 'flex', alignItems: 'center' }]}>
                {direction === "left" && <Ionicons name={"airplane"} color={COLORS.textWhite} size={10} style={[{ marginRight: 10 }, styles.city, (direction === 'right' && styles.right)]} />
                }<Text
                    style={[styles.text, (direction === 'right' && styles.right), { marginRight: 10 }]}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                >
                    {direction === "right"
                        ? "Rückflug"
                        : "Hinflug"
                    }
                </Text>
                {direction === "right" && <Ionicons name={"airplane"} color={COLORS.textWhite} size={10} style={[{ transform: [{ rotate: '180deg' }] }, styles.city, (direction === 'right' && styles.right)]} />
                }
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

    const pressed = () => {
        console.log("Umleitung/ Öffnen des Browsers initialisieren")
    }

    return (
        <View style={styles.root}>
            <Info direction={"left"} iataCode={data.origin} date={data.outboundDate} />
            <View>
                <Text style={[styles.textSmall, { marginLeft: 30 }, { backgroundColor: COLORS.background, alignItems: 'center' }]}>Zusammen ab</Text>
                <Text style={styles.costs}>{data.totalPrice} €</Text>
            </View>
            <View>
                <Info direction={"right"} iataCode={data.destination} date={data.inboundDate} />
                <TouchableOpacity onPress={pressed}>
                    <Text style={styles.button}>Jetzt buchen</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}