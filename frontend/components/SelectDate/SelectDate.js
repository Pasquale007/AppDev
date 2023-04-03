import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from 'react';
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

export default function SelectDate({ onSelect }) {
    const [startDate, setStartDate] = useState(new Date(Date.now()));
    const [endDate, setEndDate] = useState(new Date(Date.now()));
    const [editStart, setStartEdit] = useState(false);
    const [editEnd, setEndEdit] = useState(false);

    useEffect(() => {
        if (startDate > endDate) {
            setEndDate(startDate);
        }
        if (!startDate || !endDate) {
            return;
        }
        onSelect({
            'from': startDate,
            'until': endDate
        })
    }, [endDate, startDate]);

    const onDateSelected = (_event, value) => {
        if (editStart) {
            setStartDate(value);
        } else if (endDate) {
            setEndDate(value);
        }
        setStartEdit(false);
        setEndEdit(false);
    }

    return (
        <View>
            {editStart && <DateTimePicker
                value={startDate}
                onChange={onDateSelected}
                minimumDate={new Date(Date.now())}
                testID='datePicker1'
            />}

            {editEnd && <DateTimePicker
                value={endDate}
                onChange={onDateSelected}
                minimumDate={(new Date(Date.now()) < startDate) ? startDate : new Date(Date.now())}
                testID='datePicker2'
            />}
            <View style={styles.flex}>
                <Display value={startDate} title={"Von"} onClick={() => setStartEdit(true)} />
                <Display value={endDate} title={"Bis"} onClick={() => setEndEdit(true)} />
            </View>
        </View>
    );
}