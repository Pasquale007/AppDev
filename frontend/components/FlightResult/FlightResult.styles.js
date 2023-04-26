import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    main: {
        backgroundColor: COLORS.cardColor,
        borderRadius: 20,
        padding: "5%",
    },
    root: {
        marginTop: '8%',
        backgroundColor: COLORS.cardColor,
        borderRadius: 20,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
    },
    city: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.textWhite,
    },
    text: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.textWhite,
    },
    textSmall: {
        fontFamily: FONT.bold,
        fontSize: SIZES.small,
        color: COLORS.textWhite,
    },
    date: {
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        color: COLORS.textWhite,
    },
    right: {
        textAlign: 'right',
    },
    costs: {
        color: COLORS.textWhite,
        fontSize: SIZES.xxLarge,
        fontFamily: FONT.bold,
        backgroundColor: COLORS.background
    },
    button: {
        fontSize: SIZES.medium,
        color: COLORS.textWhite,
        fontFamily: FONT.medium,
        backgroundColor: COLORS.background,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        width: '40%'
    }

});

export default styles;
