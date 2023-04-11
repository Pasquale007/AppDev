import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    flex: {
        height: 40,
        width: "90%",
        backgroundColor: COLORS.searchButtonColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
    },
    clickElement: {
        height: '100%',
    },
    text: {
        fontFamily: FONT.semiBold,
        fontSize: SIZES.small,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5,

    },
    active: {
        height: '100%',
        backgroundColor: COLORS.searchFieldColor,
        borderRadius: 20,
    },
    passive: {
        height: '100%',
        color: COLORS.textWhite,
        borderRadius: 20,
    }

});

export default styles;
