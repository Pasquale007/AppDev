import React, { useEffect, useState } from 'react';
import { Linking, Text, View } from "react-native";
import styles from './FlightResult.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import flightData from '../../data/flightData.json';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Info({ direction, iataCode, date, bookingLink }) {
    const [cityName, setCityName] = useState("");

    useEffect(() => {
        const airport = flightData.find(airport => airport.origin.iata === iataCode);
        setCityName(airport.origin.name)
    }, []);

    const pressed = () => {
        Linking.openURL(bookingLink).catch(err => console.error('An error occurred: ', err));
    }

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
        <View style={[(direction === 'right' ? styles.right : { paddingBottom: 2 }), { padding: '5%', paddingTop: '3%', width: '100%' }]}>
            <View
                style={[
                    direction === "left"
                        ? ({ justifyContent: 'flex-start' })
                        : ({ justifyContent: 'flex-end' }),
                    { display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>


            </View>
            <View style={[
                direction === "left"
                    ? ({ flexDirection: 'row' })
                    : ({ flexDirection: 'row-reverse' }), { justifyContent: 'flex-start', display: 'flex', alignItems: 'center' }]}>
                {direction === "right" &&
                    <Ionicons
                        name={"airplane"}
                        color={COLORS.textWhite}
                        size={13}
                        style={[{ transform: [{ rotate: '180deg' }], marginLeft: '2%' }, styles.right]} />}
                {direction === "left" &&
                    <Ionicons
                        name={"airplane"}
                        color={COLORS.textWhite}
                        size={13}
                        style={[{ marginRight: 10 }, (direction === 'right' && styles.right)]}
                    />}
                <Text
                    style={[styles.city, (direction === 'right' && styles.right)]}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                >
                    {cityName}
                </Text>
            </View>
            <Text
                style={[styles.date, (direction === 'right' && styles.right)]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
            >
                {getDate()}
            </Text>
            {direction === "right" &&
                <TouchableOpacity onPress={pressed} style={styles.button}>
                    <Text style={styles.bookingButton}>Jetzt buchen</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

export default function FlightResult({ data }) {


    return (
        <View style={styles.root}>
            <Info
                direction={"left"}
                iataCode={data.origin}
                date={data.outboundDate}
            />
            <View style={{ backgroundColor: COLORS.background, height: 18, marginTop: '6%', marginBottom: '4%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.textSmall, { transform: [{ translateX: -110 }] }]}>Zusammen ab</Text>
                    <View style={styles.costs}>
                        <Text style={styles.costsText}>{(Math.round(data.totalPrice * 100) / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</Text>
                    </View>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>

                <Info
                    direction={"right"}
                    iataCode={data.destination}
                    date={data.inboundDate}
                    bookingLink={data.bookingLink}
                />
            </View>
        </View>
    );

}