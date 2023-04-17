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

export default function SearchPage() {
    const [startAndEndTime, setStartAndEndTime] = React.useState();
    const [value, setValue] = React.useState("");
    const [data, setData] = React.useState([
        { id: '1', name: 'Alpha' },
        { id: '2', name: 'Beta' },
        { id: '3', name: 'Gamma' },
    ]);
    const navigation = useNavigation();
    return (
        <View style={styles.flex}>
            <ScrollView>
                <ImageBackground
                    source={image}
                    resizeMode="cover">

                    <View style={styles.main} >
                        <Text style={styles.seachText}>Suche</Text>

                        <DropDown data={data} title={"Von"} icon="aircraft-take-off" />
                        <DropDown data={data} title={"Nach"} icon="aircraft-landing" />
                        <View style={styles.center}>
                            <MySelect left={"Flexible Reisedaten"} right={"Flexible Reisedaten"} style={{ alignSelf: 'center' }} />
                        </View>
                        <SettingsItem
                            label="Verfügbarer Reisezeitraum"
                            icon='calendar-outline'
                            content={
                                <View>
                                    <SelectDate />
                                </View>}
                        />
                        <SettingsItem
                            label="Reisedauer"
                            icon='timer-outline'
                            content={
                                <View>
                                    <SelectDuration setValues={setStartAndEndTime} />
                                </View>}
                        />
                    </View>
                </ImageBackground>
                <Button
                    text={"Suche"}
                    onClick={(e) => {
                        console.log(e);
                        navigation.navigate('FlightResultPage');
                        }}
                />
            </ScrollView>
        </View>
    );
}