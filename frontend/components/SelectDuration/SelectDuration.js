import { View, TextInput, Text } from "react-native";
import styles from '../SelectDuration/SelectDuration.style';
import * as React from 'react';

const maxLengthInput = 2;
export default function SelectDuration({ onSelect }) {
    const [start, setStart] = React.useState();
    const [end, setEnd] = React.useState();
    const defaultPlaceholderSmall = '1';
    const defaultPlaceholderBig = '15';

    const [placeholderTextSmall, setPlaceholderTextSmall] = React.useState('1');
    const [placeholderTextBig, setPlaceholderTextBig] = React.useState('15');
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
        if (parseInt(numericInput) > 15) {
            numericInput = '15';
        }
        setEnd(numericInput);
    }

    const setPlaceholder = (value, callback, placeholderVlaue) => {
        if (!value) {
            callback(placeholderVlaue)
        }
    }
    return (
        <View style={styles.row}>
            <TextInput
                placeholder={placeholderTextSmall}
                maxLength={maxLengthInput}
                keyboardType='numeric'
                style={styles.input}
                value={start}
                onChangeText={handleStartChangeText}
                onFocus={() => { setPlaceholderTextSmall("") }}
                onBlur={() => { setPlaceholder(start, setPlaceholderTextSmall, defaultPlaceholderSmall) }}
            />
            <Text style={styles.text}>bis</Text>

            <TextInput
                placeholder={placeholderTextBig}
                maxLength={maxLengthInput}
                keyboardType='numeric'
                style={styles.input}
                onEndEditing={() => checkValid()}
                value={end}
                onChangeText={handleEndChangeText}
                onFocus={() => { setPlaceholderTextBig("") }}
                onBlur={() => { setPlaceholder(end, setPlaceholderTextBig, defaultPlaceholderBig) }}
            />
            <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={1}>Tagen</Text>
        </View>
    );
}