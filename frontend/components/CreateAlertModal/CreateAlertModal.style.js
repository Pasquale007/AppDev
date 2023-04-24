import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.cardColor,
        height: "auto",
        borderRadius: SIZES.xSmall,
        padding: SIZES.xSmall,
    },

    headContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.textWhite,
    },

    headline: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.textWhite,
    },

    closeIcon: {
        color: COLORS.textWhite,
    },

    dataContainer: {
        marginTop: SIZES.xSmall,
        display: "flex",
        gap: SIZES.xSmall,
    }

});

export default styles;
