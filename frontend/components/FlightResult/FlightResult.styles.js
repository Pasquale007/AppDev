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
        fontSize: SIZES.large,
        color: COLORS.textWhite,
    },
    text: {
        fontFamily: FONT.bold,
        fontSize: SIZES.small,
        color: COLORS.textWhite,
    },
    textSmall: {
        fontFamily: FONT.medium,
        fontSize: SIZES.xSmall,
        color: COLORS.textWhite,
        padding: 2,
        alignItems: 'center',
    },
    date: {
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        color: COLORS.textWhite,
    },
    right: {
        paddingBottom: 0,
        paddingLeft: 0,
        textAlign: 'right',
        paddingTop: 1,

    },
    costs: {
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: COLORS.background,
        borderRadius: 20,

    },
    costsText: {
        color: COLORS.textWhite,
        fontSize: SIZES.xLarge,
        fontFamily: FONT.bold,
        padding: 10,
    },
    button: {
        fontSize: SIZES.medium,
        color: COLORS.textWhite,
        fontFamily: FONT.medium,
        backgroundColor: COLORS.background,
        padding: 10,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        textAlign: 'center',
        width: 150,
    }

});

export default styles;
