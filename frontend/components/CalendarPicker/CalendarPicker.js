import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import styles from './CalendarPicker.styles.js';
import Calendar from 'react-native-calendar-range-picker';

export default function CalendarPicker({ visible, onSelect, onClose }) {
  const [range, setRange] = useState({});

  const handleSelect = ({ startDate, endDate }) => {
    setRange({ start: startDate, end: endDate });
  };


  const handleConfirm = () => {
    onSelect(range)
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Calendar
            minDate={new Date(Date.now())}
            onChange={handleSelect}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.buttonText}>Abbruch</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleConfirm}
            disabled={!range.start || !range.end}
          >
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

}  