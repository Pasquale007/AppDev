import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: "5%",
        marginTop: "30%",
        height: '70%',
        color: COLORS.background,
    },
    button: {
        borderRadius: 10,
        backgroundColor: COLORS.searchButtonColor,
    },
    seachText: {
        fontFamily: FONT.bold,
        color: COLORS.textWhite,
        fontSize: SIZES.xxLarge,
    },
    inputField: {
        color: COLORS.searchFieldColor,
        borderRadius: 10,
    },
    switchSelected: {
        backgroundColor: COLORS.switchActive,
        borderRadius: 10,
    },
    switchDeselected: {
        backgroundColor: COLORS.switchInactive,
        borderRadius: 10,
    },
    backgroundColor: {
        backgroundColor: COLORS.background,
    },
    textPadding: {
        paddingTop: 30,
        marginTop: 30,
        marginBottom: 30,
        paddingBottom: 30,
        fontFamily: FONT.bold,
        color: COLORS.textWhite,
        fontSize: SIZES.xxLarge,
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
});

export default styles;
