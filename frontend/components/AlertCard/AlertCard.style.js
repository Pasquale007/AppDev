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

    button: {
        backgroundColor: COLORS.deleteColor,
        width: 60,
        borderTopRightRadius: SIZES.xSmall,
        borderBottomRightRadius: SIZES.xSmall,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: SIZES.xSmall,
    },

    searchButton: {
        flex: 1,
        paddingLeft: SIZES.medium,
        backgroundColor: COLORS.switchActive,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: SIZES.xSmall,
        borderBottomLeftRadius: SIZES.xSmall,
    },

    buttonText: {
        color: COLORS.textWhite,
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
    },

    trashIcon: {
        color: COLORS.textWhite,
    },

    cardBackground: {
        position: "absolute",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
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
