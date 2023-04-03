import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from '../../constants/theme';


const styles = StyleSheet.create({
    selected: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: isSelected ? COLORS.cardColor : COLORS.background,
    },

});

export default styles;
