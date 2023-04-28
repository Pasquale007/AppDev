import React from 'react';
import { Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import styles from './EmptyFlights.styles';

export default function EmptyFlights() {

    return (
        <View style={styles.main}>
            <View>
                <Ionicons name={'airplane'} color={COLORS.textWhite} style={styles.airplane} />
                <View style={styles.backrang}>
                    <Ionicons name={'airplane'} color={COLORS.textWhite} style={styles.airplane} />
                    <Ionicons name={'airplane'} color={COLORS.textWhite} style={styles.airplane} />
                </View>
            </View>
            <Text style={styles.text}>
                Für deine Suche wurden leider Keine Flüge gefunden. Setzte doch einen Alert um über Änderungen informiert zu werden.
            </Text>
        </View>
    );
}
