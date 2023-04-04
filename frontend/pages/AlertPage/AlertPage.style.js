import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    alertContainer:{
        flex: 1,
        paddingHorizontal: SIZES.medium,
        marginTop: 30,
        paddingBottom: SIZES.medium,
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
    },
});

export default styles;
