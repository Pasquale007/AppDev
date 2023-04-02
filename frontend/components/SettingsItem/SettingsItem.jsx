import { Ionicons } from '@expo/vector-icons';
import styles from './SettingsItem.style';
import { View, Text } from 'react-native';

export default function SettingsItem({ label, content, icon }) {
    return (
        <View style={styles.main}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.flex}>
                <Ionicons name={icon} size={40} color={"balck"} style={{ marginLeft: 10 }} />
                {content}
            </View>
        </View>
    );
}