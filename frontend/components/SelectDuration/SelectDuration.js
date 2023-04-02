import { View, TextInput, Text } from "react-native";
import styles from '../SelectDuration/SelectDuration.style';
import * as React from 'react';

const maxLengthInput = 2;
export default function SelectDuration({ setValues }) {
    const [start, setStart] = React.useState();
    const [end, setEnd] = React.useState();

    React.useEffect(() => {
        setValues(
            {
                'start': start,
                'end': end
            }
        )
    }, [start, end])

    return (
        <View style={styles.row}>
            <TextInput
                maxLength={maxLengthInput}
                keyboardType='numeric'
                style={styles.input}
                onChangeText={setStart}
            />
            <Text style={styles.text}>bis</Text>

            <TextInput
                maxLength={maxLengthInput}
                keyboardType='numeric'
                style={styles.input}
                onChangeText={setEnd}
            />
            <Text style={styles.text}>Tagen</Text>
        </View>
    );
}