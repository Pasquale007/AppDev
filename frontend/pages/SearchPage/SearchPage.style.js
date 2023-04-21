import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";
import { Dimensions } from 'react-native'

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: Dimensions.get('window').width,
    },
    disabled: {
        opacity: 0,
        pointerEvents: 'none',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: "5%",
        marginTop: "30%",
        color: COLORS.background,
        height: Dimensions.get('window').height * 0.6,

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
        alignItems: 'center',
        marginVertical: 20,
    },
});

export default styles;
