import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../SelectDate/SelectDate.style';

function Display({ value, title, onClick }) {
    return (
        <TouchableOpacity onPress={onClick}>
            <Text>{title}</Text>
            <Text style={styles.date}>{value?.toLocaleString('default', { day: '2-digit', month: 'short' })}</Text>
        </TouchableOpacity>
    );
}

export default function SelectDate() {
    const [startDate, setStartDate] = useState(new Date(Date.now()));
    const [endDate, setEndDate] = useState(new Date(Date.now()));
    const [editStart, setStartEdit] = useState(false);
    const [editEnd, setEndEdit] = useState(false);

    const onDateSelected = (_event, value) => {
        if (editStart) {
            setStartDate(value);
            setStartEdit(false);
        } else if (endDate) {
            setEndDate(value);
            setEndEdit(false);
        }
    }

    return (
        <View>
            {(editStart || editEnd) && <DateTimePicker
                value={startDate}
                onChange={onDateSelected}
            />}
            <View style={styles.flex}>
                <Display value={startDate} title={"Von"} onClick={() => setStartEdit(true)} />
                <Display value={endDate} title={"Bis"} onClick={() => setEndEdit(true)} />
                {/*nicht schön, aber felxGrow funktioniert nicht */}
                <View />
                <View />
                <View />
                <View />
                <View />
                <View />
                <View />
            </View>
        </View>
    );
}