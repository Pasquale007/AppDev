import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, TouchableOpacity, View } from "react-native";
import image from '../../assets/images/background.jpg';
import styles from './FlightResultPage.styles';
import { COLORS } from '../../constants/theme';
import FlightResult from '../../components/FlightResult/FlightResult';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CreateAlertModal from '../../components/CreateAlertModal/CreateAlertModal';
import ToastContainer from '../../components/ToastContainer/ToastContainer';
import Toast from 'react-native-toast-message';
import { fetchData } from '../../axios';
import EmptyFlights from '../../components/EmptyFlights/EmptyFlights';
import LoadingScreen from '../LoadingPage/Loading';

export default function FlightResultPage({ route }) {
    const [createAlertModalIsVisible, setCreateAlertModalIsVisible] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigation = useNavigation();
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

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

    const [trips, setTrips] = useState([]);

    useEffect(() => {
        setData();
    }, []);

    async function setData() {
        const response = await fetchData(route.params.data, currentPage);
        if (currentPage === 1) {
            setTrips(response);
        } else {
            if (response.length > 0) {
                setTrips(response);
            }
        }
        console.log(response)

        setIsLoaded(true)
    }

    useEffect(() => {
        setData();
    }, [currentPage])

    return (
        <SafeAreaView>
            {!isLoaded ? <LoadingScreen loadingPhrases />
                :
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
                            :
                            <FlatList
                                data={trips}
                                renderItem={({ item }) =>
                                    <FlightResult
                                        key={item.outboundDate + item.origin + item.inboundDate + item.destination}
                                        data={item}
                                    />
                                }
                                keyExtractor={trip => trip.outboundDate + trip.origin + trip.inboundDate + trip.destination}
                                onEndReached={() => { setCurrentPage(currentPage + 1) }}
                            />
                        }
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
            }
        </SafeAreaView>
    );
}