import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants/theme";

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
    text: {
        fontFamily: FONT.semiBold,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        verticalAlign: 'middle',
        padding: 5,
    },
    active: {
        height: '100%',
        borderRadius: 20,
    },
    passive: {
        height: '100%',
        color: COLORS.textWhite,
        borderRadius: 20,
    },
    activeBG: {
        height: '100%',
        backgroundColor: COLORS.searchFieldColor,
        borderRadius: 20,
    },
    passiveBG: {
        height: '100%',
        color: COLORS.textWhite,
        borderRadius: 20,
    }

});

export default styles;
