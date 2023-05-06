import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    alertContainer: {
        flex: 1,
        paddingBottom: SIZES.medium,
        marginTop: 30,
        minHeight: "100%",
    },

    alertHeadline: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.textWhite,
        marginBottom: SIZES.xLarge,
    },

    noAlertsContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "85%",
    },

    alertIcon: {
        color: COLORS.emptyAlert,
    },

    noAlertsText: {
        color: COLORS.emptyAlert,
    },

    alertCardContainer: {
        display: "flex",
        gap: SIZES.medium,
        marginLeft: SIZES.medium,
        marginRight: SIZES.medium

    },
});

export default styles;