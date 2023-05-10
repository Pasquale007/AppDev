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

    minLineHeight: {
        lineHeight: SIZES.small,
    },

    locationsContainer: {
        display: "flex",
        flexDirection: "row",
    },  

    arrowContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 5,
    },  

    locations: {
        marginLeft: 8,
        width: "100%",
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
        borderRadius: SIZES.xSmall,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    trashIcon: {
        color: COLORS.textWhite,
    },

    cardBackground: {
        position: "absolute",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: COLORS.deleteColor,
        width: "100%",
        height: "100%",
        borderRadius: 12,
        zIndex: -1,
    },

    cardBackgroundText: {
        color: COLORS.textWhite,
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        marginRight: 60,
        paddingRight: SIZES.xSmall,
    }

});

export default styles;
