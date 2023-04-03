import { StyleSheet } from "react-native";
import { Platform, StatusBar } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    alertContainer:{
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingHorizontal: 16,
        marginTop: 30,
        paddingBottom: 16,
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
