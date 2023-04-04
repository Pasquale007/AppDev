import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../SelectDate/SelectDate.style';
import CalendarPicker from '../CalendarPicker/CalendarPicker';

function Display({ value, title, onClick }) {
    return (
        <View onPress={onClick}>
            <Text>{title}</Text>
            <Text style={styles.date}>{value?.toLocaleString('default', { day: '2-digit', month: 'short' })}</Text>
        </View>
    );
}

export default function SelectDate({ onSelect }) {
    const [range, setRange] = useState({
        'start': new Date(Date.now()),
        'end': new Date(Date.now()),
    });
    const [calendarVisible, setCalendarVisible] = useState(false);

    const select = (range) => {
        setRange(range)
        onSelect({
            'from': new Date(range.start),
            'until': new Date(range.end),
        });

    }
    return (
        <View>
            {calendarVisible &&
                <CalendarPicker
                    minDate={new Date()}
                    visible={calendarVisible}
                    onSelect={(range) => select(range)}
                    onClose={() => setCalendarVisible(false)}
                />
            }
            <TouchableOpacity style={styles.flex} onPress={() => setCalendarVisible(true)} testID='clickable'>
                <Display value={new Date(range.start)} title={"Von"} />
                <Display value={new Date(range.end)} title={"Bis"} />
            </TouchableOpacity>
        </View>
    );
}
