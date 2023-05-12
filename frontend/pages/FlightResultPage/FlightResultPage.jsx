import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, TouchableOpacity, View } from "react-native";
import image from '../../assets/images/background.jpg';
import styles from './FlightResultPage.styles';
import { COLORS } from '../../constants/theme';
import FlightResult from '../../components/FlightResult/FlightResult';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CreateAlertModal from '../../components/CreateAlertModal/CreateAlertModal';
import ToastContainer from '../../components/ToastContainer/ToastContainer';
import Toast from 'react-native-toast-message';
import { fetchData } from '../../axios';
import EmptyFlights from '../../components/EmptyFlights/EmptyFlights';

export default function FlightResultPage({ route }) {
    const [createAlertModalIsVisible, setCreateAlertModalIsVisible] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [trips, setTrips] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        if (successMsg) {
            Toast.show({
                type: "success",
                text1: successMsg,
            })
            setSuccessMsg("");
        }

        if (errorMsg) {
            Toast.show({
                type: "error",
                text1: errorMsg,
            })
            setErrorMsg("");
        }
    }, [successMsg, errorMsg]);


    useEffect(() => {
        async function setData() {
            setCreateAlertModalIsVisible(false);
            setSuccessMsg("");
            setErrorMsg("");
            useNavigation();
            let response = await fetchData(route.params.data);
            console.log(response)
            console.log(route.params.data.maxprice)
            if (route.params.data.maxprice !== 0) {
                response = response.filter(data => data.totalPrice <= route.params.data.maxprice)
            }
            console.log("After filter")
            console.log(response)
            setTrips(response);

        }
        setData();
        return () => { setTrips([]) }
    }, []);

    return (
        <SafeAreaView>
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={{ height: '100%' }}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Ionicons
                            name={'arrow-back-outline'}
                            size={40}
                            color={COLORS.textWhite}
                            style={styles.icon}
                            onPress={() => navigation.goBack()}
                        />
                        <View style={styles.topBar}>
                            <TouchableOpacity onPress={() => setCreateAlertModalIsVisible(true)}>
                                <Ionicons
                                    name={'notifications-outline'}
                                    size={40}
                                    color={COLORS.textWhite}
                                    style={styles.iconWithoutBackground}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {trips.length == 0 ?
                        <EmptyFlights />
                        : <ScrollView
                            showsVerticalScrollIndicator={false}>
                            {trips.map(trip => {
                                return (
                                    <FlightResult
                                        key={trip.outboundDate + trip.origin + trip.inboundDate + trip.destination}
                                        data={trip}
                                    />
                                )
                            })}
                        </ScrollView>}
                    <CreateAlertModal
                        isVisible={createAlertModalIsVisible}
                        onBackdropPress={() => setCreateAlertModalIsVisible(false)}
                        data={route.params.data}
                        onSuccess={(msg) => setSuccessMsg(msg)}
                        onError={(msg) => setErrorMsg(msg)}
                    />
                </View>
                <ToastContainer />
            </ImageBackground>
        </SafeAreaView>
    );
}