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

export default function SearchPage() {
    const [startAirport, setStartAirport] = React.useState();
    const [endAirport, setEndAirport] = React.useState();
    const [startAndEndDays, setStartAndEndDays] = React.useState({
        'start': 0,
        'end': 0
    });
    const [dateSpan, setDateSpan] = React.useState({
        'from': new Date(Date.now()),
        'until': new Date(Date.now())
    });

    const [data, setData] = React.useState([
        { id: '1', name: 'Alpha' },
        { id: '2', name: 'Beta' },
        { id: '3', name: 'Gamma' },
    ]);

    return (
        <View>
            <ImageBackground
                source={image}
                resizeMode="cover">

                <View style={styles.main} >
                    <Text style={styles.seachText}>Suche</Text>

                    <DropDown data={data} title={"Von"} icon="aircraft-take-off" onSelect={setStartAirport} />
                    <DropDown data={data} title={"Nach"} icon="aircraft-landing" onSelect={setEndAirport} />
                    <View style={styles.center}>
                        <MySelect left={"Flexible Reisedaten"} right={"Flexible Reisedaten"} style={{ alignSelf: 'center' }} />
                    </View>
                    <SettingsItem
                        label="Verfügbarer Reisezeitraum"
                        icon='calendar-outline'
                        content={
                            <View>
                                <SelectDate onSelect={setDateSpan} />
                            </View>}
                    />
                    <SettingsItem
                        label="Reisedauer"
                        icon='timer-outline'
                        content={
                            <View>
                                <SelectDuration onSelect={setStartAndEndDays} />
                            </View>}
                    />
                </View>
            </ImageBackground>
            <Button
                text={"Suche"}
                onClick={(e) => console.log(e)}
            />
        </View>
    );
}