import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, SafeAreaView, TouchableOpacity, View } from "react-native";
import image from '../../assets/images/background.jpg';
import styles from './FlightResultPage.styles';
import { COLORS } from '../../constants/theme';
import FlightResult from '../../components/FlightResult/FlightResult';
import { FlatList } from 'react-native-gesture-handler';
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
    const [trips, setTrips] = useState([]);
    const navigation = useNavigation();
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetchingMoreData, setFetchingMoreData] = useState(false);

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
        setData();
    }, []);

    const renderListElements = React.useCallback(({ item, index }) => {
        return <FlightResult
            key={item.outboundDate + item.origin + item.inboundDate + item.destination}
            data={item}
        />
    }, []);

    const setData = React.useCallback(async () => {
        const response = await fetchData(route.params.data, currentPage);
        if (currentPage === 1) {
            setTrips(response);
        } else {
            if (response.length > 0) {
                setTrips([...trips, ...response]);
            }
        }
        console.log(response)
        setFetchingMoreData(false)

        setIsLoaded(true)
    }, [currentPage]);

    useEffect(() => {
        setData();
    }, [currentPage]);

    return (
        <SafeAreaView>
            {!isLoaded
                ? <LoadingScreen loadingPhrases />
                : <ImageBackground
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
                                onPress={() => { navigation.navigate("Search"); setTrips([]) }}
                            />
                            <View style={styles.topBar}>
                                <TouchableOpacity onPress={() => setCreateAlertModalIsVisible(true)}>
                                    <Ionicons
                                        name={'notifications-outline'}
                                        size={40}
                                        color={COLORS.textWhite}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {trips.length == 0 ?
                            <EmptyFlights />
                            :
                            <FlatList
                                data={trips}
                                renderItem={renderListElements}
                                keyExtractor={trip => trip.outboundDate + trip.origin + trip.inboundDate + trip.destination}
                                onEndReached={() => { setFetchingMoreData(true); setCurrentPage(currentPage + 1) }}
                                showsVerticalScrollIndicator={false}
                            />
                        }
                        {fetchingMoreData && <ActivityIndicator style={styles.activityIndicator} size={40} />}

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