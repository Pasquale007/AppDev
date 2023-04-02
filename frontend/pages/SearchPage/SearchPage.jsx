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

export default function HomePage() {
    const [startAndEndTime, setStartAndEndTime] = React.useState();
    const [value, setValue] = React.useState("");
    const [data, setData] = React.useState([
        { id: '1', name: 'Alpha' },
        { id: '2', name: 'Beta' },
        { id: '3', name: 'Gamma' },
    ]);

    return (
        <ImageBackground
            source={image}
            resizeMode="cover">

            <View style={styles.main} >
                <Text style={styles.seachText}>Suche</Text>

                <DropDown data={data} title={"Von"} icon="aircraft-take-off" />
                <DropDown data={data} title={"Nach"} icon="aircraft-landing" />

                <MySelect left={"Flexible Reisedaten"} right={"Flexible Reisedaten"} style={{ alignSelf: 'center' }} />
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
                <Button
                    text={"Suche"}
                    onClick={(e) => console.log(e)}
                />

            </View>
        </ImageBackground>
    );


}