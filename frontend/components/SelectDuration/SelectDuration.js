import { View, TextInput, Text } from "react-native";
import styles from '../SelectDuration/SelectDuration.style';
import * as React from 'react';

const maxLengthInput = 2;
export default function SelectDuration({ onSelect }) {
    const [start, setStart] = React.useState();
    const [end, setEnd] = React.useState();


    React.useEffect(() => {
        if (start && end && parseInt(start) > parseInt(end)) {
            setEnd((parseInt(start)).toString());
        }
    }, [start, end]);

    React.useEffect(() => {
        onSelect(
            {
                'start': start,
                'end': end
            }
        )
    }, [start, end])

    return (
        <View style={styles.row}>
            <TextInput
                placeholder="00"
                maxLength={maxLengthInput}
                keyboardType='numeric'
                style={styles.input}
                onChangeText={setStart}
            />
            <Text style={styles.text}>bis</Text>

            <TextInput
                placeholder="12"
                maxLength={maxLengthInput}
                keyboardType='numeric'
                style={styles.input}
                value={end}
                onChangeText={setEnd}
            />
            <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={1}>Tagen</Text>
        </View>
    );
}