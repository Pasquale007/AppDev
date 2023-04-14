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

    const handleStartChangeText = (text) => {
        // Use a regular expression to remove any non-numeric characters
        const numericInput = text.replace(/[^0-9]/g, '');
        setStart(numericInput);
    }

    const handleEndChangeText = (text) => {
        // Use a regular expression to remove any non-numeric characters
        const numericInput = text.replace(/[^0-9]/g, '');
        setEnd(numericInput);
    }


    return (
        <View style={styles.row}>
            <TextInput
                placeholder="00"
                maxLength={maxLengthInput}
                keyboardType='numeric'
                style={styles.input}
                onChangeText={handleStartChangeText}
            />
            <Text style={styles.text}>bis</Text>

            <TextInput
                placeholder="12"
                maxLength={maxLengthInput}
                keyboardType='numeric'
                style={styles.input}
                value={end}
                onChangeText={handleEndChangeText}
            />
            <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={1}>Tagen</Text>
        </View>
    );
}