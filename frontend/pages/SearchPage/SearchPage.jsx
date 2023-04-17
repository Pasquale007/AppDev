import * as React from 'react';
import { View, Text, ImageBackground, Alert } from 'react-native';
import styles from './SearchPage.style';
import image from '../../assets/images/background.jpg';
import Button from '../../components/Button/Button';
import SettingsItem from '../../components/SettingsItem/SettingsItem';
import SelectDuration from '../../components/SelectDuration/SelectDuration';
import SelectDate from '../../components/SelectDate/SelectDate';
import MySelect from '../../components/Select/Select';
import DropDown from '../../components/SearchableDropdown/SearchableDropdown';
import { ScrollView } from 'react-native-gesture-handler';

export default function SearchPage() {
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

    const data = [
        { id: '1', name: 'Alpha' },
        { id: '2', name: 'Beta' },
        { id: '3', name: 'Gamma' },
    ];

    const showToast = (title, message) => {
        Alert.alert(title, message);
    }
    return (
        <View style={styles.flex}>
            <ScrollView >
                <ImageBackground
                    source={image}
                    resizeMode="cover"
                >
                    <View style={styles.main} >
                        <Text style={styles.seachText}>Suche</Text>
                        <DropDown data={data} title={"Von"} icon="aircraft-take-off" onSelect={setStartAirport} />
                        <DropDown data={data} title={"Nach"} icon="aircraft-landing" onSelect={setEndAirport} />
                        <View style={styles.center}>
                            <MySelect left={"Flexible Reisedaten"} right={"Genaue Reisedaten"} style={{ alignSelf: 'center' }} onClick={() => { setFlexible(!flexible) }} />
                        </View>
                        <View
                            style={(!flexible) && styles.double}
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
                            style={(!flexible) && styles.disabled}
                        >
                            <SettingsItem
                                label="Reisedauer"
                                icon='timer-outline'
                                content={
                                    <View>
                                        <SelectDuration onSelect={setDuration} defaultValue={duration} />
                                    </View>}
                            />
                        </View>
                    </View>
                </ImageBackground>
                <Button
                    text={"Suche"}
                    onClick={() => {
                        if (flexible) {
                            console.log(duration)
                            if (!duration) {
                                showToast("Fehler", "Die Reisedauer muss definiert sein.");
                                return;
                            }
                            const durationInDays = parseInt(duration.end) - parseInt(duration.start)
                            const spanInDays = Math.ceil(Math.abs(new Date(dateSpan.until) - new Date(dateSpan.from)) / (1000 * 60 * 60 * 24));
                            if (durationInDays > spanInDays || parseInt(duration.start) > spanInDays) {
                                showToast("Fehler", "Die Reisedauer darf nicht länger sein als der Reisezeitraum.")
                                return;
                            }
                        }
                        const data = {
                            'startAirport': startAirport,
                            'endAirport': endAirport,
                            'duration': flexible ? duration : undefined,
                            'dateSpan': dateSpan
                        }
                        console.log(data);
                    }
                    }
                />
            </ScrollView>

        </View>
    );
}