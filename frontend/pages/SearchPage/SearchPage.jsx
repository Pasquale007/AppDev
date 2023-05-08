import * as React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles from './SearchPage.style';
import image from '../../assets/images/background.jpg';
import Button from '../../components/Button/Button';
import SettingsItem from '../../components/SettingsItem/SettingsItem';
import SelectDuration from '../../components/SelectDuration/SelectDuration';
import SelectDate from '../../components/SelectDate/SelectDate';
import MySelect from '../../components/Select/Select';
import DropDown from '../../components/SearchableDropdown/SearchableDropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import flightData from '../../data/flightData.json';
import ToastContainer from '../../components/ToastContainer/ToastContainer';
import Toast from 'react-native-toast-message';

export default function SearchPage() {
    const origins = flightData.map(dataset => dataset.origin);
    const [destinations, setDestinations] = React.useState([]);
    const [flexible, setFlexible] = React.useState(false);
    const [startAirport, setStartAirport] = React.useState();
    const [endAirport, setEndAirport] = React.useState();
    const [duration, setDuration] = React.useState({
        'start': 0,
        'end': 0
    });
    const [dateSpan, setDateSpan] = React.useState({
        'from': new Date(Date.now()),
        'until': new Date(Date.now())
    });

    React.useEffect(() => {
        const dataset = flightData
            .filter(dataset => dataset.origin.name === startAirport?.name)
            .flatMap(dataset => dataset.destinations.map(dest => dest));
        setDestinations(dataset);
        setEndAirport(undefined);
    }, [startAirport]);

    const navigation = useNavigation();
    return (
        <View style={styles.flex}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <ImageBackground
                    source={image}
                    resizeMode="cover"
                >
                    <View style={styles.main}>
                        <Text style={styles.seachText}>Suche</Text>
                        <DropDown data={origins} title={"Von"} icon="aircraft-take-off" onSelect={setStartAirport} />
                        <DropDown data={destinations} title={"Nach"} icon="aircraft-landing" onSelect={setEndAirport} />
                        <View style={styles.center}>
                            <MySelect left={"Flexible Reisedaten"} right={"Genaue Reisedaten"} style={{ alignSelf: 'center' }} onClick={() => { setFlexible(!flexible) }} />
                        </View>
                        <View
                            style={(flexible) && styles.double}
                        >
                            <SettingsItem
                                label="Verfügbarer Reisezeitraum"
                                icon='calendar-outline'
                                content={
                                    <View>
                                        <SelectDate onSelect={setDateSpan} />
                                    </View>}
                            />
                        </View>

                        <View
                            style={(flexible) && styles.disabled}
                        >
                            <SettingsItem
                                label="Reisedauer"
                                icon='timer-outline'
                                content={
                                    <View>
                                        <SelectDuration onSelect={setDuration} />
                                    </View>}
                            />
                        </View>
                    </View>
                </ImageBackground>
                <Button
                    text={"Suche"}
                    onClick={async () => {
                        //await sendPushNotification('ExponentPushToken[Ef5M2qFl2bYdnWJG_LfS9m]');
                        if (!startAirport) {
                            Toast.show({
                                type: "error",
                                text1: "Keinen Startflughafen ausgewählt!",
                            });
                            return;
                        }

                        if (!flexible) {
                            if (!duration.start || !duration.end) {
                                Toast.show({
                                    type: "error",
                                    text1: "Die Reisedauer muss definiert sein.",
                                });
                                return;
                            }
                            const durationInDays = parseInt(duration.end) - parseInt(duration.start)
                            const spanInDays = Math.ceil(Math.abs(new Date(dateSpan.until) - new Date(dateSpan.from)) / (1000 * 60 * 60 * 24));
                            if (durationInDays > spanInDays || parseInt(duration.start) > spanInDays || parseInt(duration.end) > spanInDays) {
                                Toast.show({
                                    type: "error",
                                    text1: "Die Reisedauer darf nicht länger sein als der Reisezeitraum.",
                                });
                                return;
                            }
                        }
                        navigation.navigate('FlightResultPage', {
                            data: {
                                'origin': startAirport,
                                'destination': endAirport || { name: "Europa", iata: 'All destinations' },
                                'ignoredDestinations': '',
                                'outFromDate': dateSpan?.from?.toISOString().split('T')[0],
                                'outToDate': dateSpan?.until?.toISOString().split('T')[0],
                                'lengthMin': !flexible ? duration?.start : -1,
                                'lengthMax': !flexible ? duration?.end : -1
                            }
                        });
                    }}
                />
            </ScrollView>
            <ToastContainer />
        </View>
    );
}