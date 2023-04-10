import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";


const styles = StyleSheet.create({
    flex: {
        width: "83%",
        backgroundColor: COLORS.searchButtonColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContenet: 'center',
        borderRadius: 20
    },
    text: {
        width: '80%',
        fontFamily: FONT.semiBold,
        fontSize: SIZES.medium,
        textAlign: 'center',
    },
    active: {
        padding: 6,
        backgroundColor: COLORS.searchFieldColor,
        borderRadius: 20
    },
    passive: {
        padding: 5,
        color: COLORS.textWhite,
    }

});

export default styles;
