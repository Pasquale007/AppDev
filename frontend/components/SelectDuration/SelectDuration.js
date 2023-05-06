import { View, TextInput, Text } from "react-native";
import styles from '../SelectDuration/SelectDuration.style';
import * as React from 'react';

const maxLengthInput = 2;
export default function SelectDuration({ onSelect }) {
    const [start, setStart] = React.useState();
    const [end, setEnd] = React.useState();

    const checkValid = () => {
        if (start && end && parseInt(start) > parseInt(end)) {
            setEnd((parseInt(start)).toString());
        }
    };

    React.useEffect(() => {
        onSelect(
            {
                'start': start,
                'end': end
            }
        )
    }, [start, end])

    const handleStartChangeText = (text) => {
        const numericInput = text.replace(/[^0-9]/g, '');
        setStart(numericInput);
    }

    const handleEndChangeText = (text) => {
        let numericInput = text.replace(/[^0-9]/g, '');
        setEnd(numericInput);
    }


    return (
        <View style={styles.row}>
            <TextInput
                placeholder="1"
                maxLength={maxLengthInput}
                keyboardType='numeric'
                style={styles.input}
                value={start}
                onChangeText={handleStartChangeText}
                placeholderTextColor='#C3C3C3'
            />
            <Text style={styles.text}>bis</Text>

            <TextInput
                placeholder="15"
                maxLength={maxLengthInput}
                keyboardType='numeric'
                style={styles.input}
                onEndEditing={() => checkValid()}
                value={end}
                onChangeText={handleEndChangeText}
                placeholderTextColor='#C3C3C3'
            />
            <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={1}>Tagen</Text>
        </View>
    );
}