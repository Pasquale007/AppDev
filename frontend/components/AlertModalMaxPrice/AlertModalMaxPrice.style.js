import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 1,
    },

    head: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    }, 

    headline: {
        color: COLORS.textWhite,
        fontFamily: FONT.semiBold,
        fontSize: SIZES.medium,
    },

    priceInputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: SIZES.small,
    },

    priceInput: {
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        backgroundColor: COLORS.searchFieldColor,
        borderRadius: SIZES.small,
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: SIZES.small,
    },

    priceCurrency: {
        color: COLORS.textWhite,
        fontFamily: FONT.regular,
        fontSize: SIZES.xxLarge,
    }

});

export default styles;
