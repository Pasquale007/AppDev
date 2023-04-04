import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    
    alertCard: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        height: "auto",
        backgroundColor: COLORS.cardColor,
        borderRadius: SIZES.xSmall,
        paddingHorizontal: 15,
        paddingVertical: SIZES.xSmall,
        justifyContent: "space-between",
    },

    leftSide: {
        display: "flex",
        gap: 2,
        maxWidth: "60%",
    },

    dateText: {
        color: COLORS.textWhite,
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
    },

    departureText: {
        color: COLORS.textWhite,
        fontFamily: FONT.semiBold,
        fontSize: SIZES.medium,
    },

    arrivalText: {
        color: COLORS.textWhite,
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
    },

    rightSide: {
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "40%",
    },

    maxPriceText: {
        alignSelf: "flex-end",
        color: COLORS.textWhite,
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
    },

    toggleButtonContainer: {
        alignSelf: "flex-end",
        marginBottom: 5,
    },

    deleteButton: {
        backgroundColor: COLORS.deleteColor,
        width: 60,
        borderTopRightRadius: SIZES.xSmall,
        borderBottomRightRadius: SIZES.xSmall,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    trashIcon: {
        color: COLORS.textWhite,
    },

    cardBackground: {
        position: "absolute",
        backgroundColor: COLORS.deleteColor,
        width: "100%",
        height: "100%",
        borderRadius: 12,
        zIndex: -1,
    },

});

export default styles;
